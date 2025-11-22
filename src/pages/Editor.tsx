import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Monaco from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Save } from "lucide-react";
import Chat from "@/components/Chat";

const Editor = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const isUpdatingRef = useRef(false);

  // Load room and subscribe to changes
  useEffect(() => {
    const loadRoom = async () => {
      if (!roomCode) return;

      try {
        // Get room
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('*')
          .eq('code', roomCode)
          .single();

        if (roomError || !room) {
          toast.error("Room not found");
          navigate("/");
          return;
        }

        setRoomId(room.id);

        // Get or create file for this room
        const { data: files, error: filesError } = await supabase
          .from('room_files')
          .select('*')
          .eq('room_id', room.id);

        if (filesError) throw filesError;

        if (files && files.length > 0) {
          setFileId(files[0].id);
          setCode(files[0].content);
          setLanguage(files[0].language);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load room");
        navigate("/");
      }
    };

    loadRoom();
  }, [roomCode, navigate]);

  // Subscribe to file changes
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel('room-files-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'room_files',
          filter: `room_id=eq.${roomId}`
        },
        (payload: any) => {
          if (!isUpdatingRef.current) {
            setCode(payload.new.content);
            setLanguage(payload.new.language);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Handle presence
  useEffect(() => {
    if (!roomCode) return;

    const presenceChannel = supabase.channel(`room:${roomCode}`)
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        setOnlineUsers(Object.keys(state).length);
      })
      .on('presence', { event: 'join' }, () => {
        const state = presenceChannel.presenceState();
        setOnlineUsers(Object.keys(state).length);
      })
      .on('presence', { event: 'leave' }, () => {
        const state = presenceChannel.presenceState();
        setOnlineUsers(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(presenceChannel);
    };
  }, [roomCode]);

  const handleEditorChange = async (value: string | undefined) => {
    if (value === undefined) return;
    
    setCode(value);
    
    // Debounced auto-save
    if (fileId) {
      isUpdatingRef.current = true;
      await supabase
        .from('room_files')
        .update({ content: value })
        .eq('id', fileId);
      isUpdatingRef.current = false;
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    
    if (fileId) {
      await supabase
        .from('room_files')
        .update({ language: newLanguage })
        .eq('id', fileId);
    }
  };

  const handleSave = async () => {
    if (!fileId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('room_files')
        .update({ content: code, language })
        .eq('id', fileId);

      if (error) throw error;

      toast.success("Code saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save code");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Leave
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <div className="font-mono text-sm px-3 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
              {roomCode}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{onlineUsers} online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="sm"
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor and Chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Monaco Editor */}
        <div className="flex-1 border-r border-border">
          <Monaco
            height="100%"
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Chat Sidebar */}
        {roomId && <Chat roomId={roomId} />}
      </div>
    </div>
  );
};

export default Editor;
