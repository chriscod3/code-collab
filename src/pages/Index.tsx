import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Code2, Users, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const createRoom = async () => {
    setIsCreating(true);
    try {
      // Generate unique room code
      const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
      
      if (codeError) throw codeError;
      
      const newCode = codeData;

      // Create room
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .insert([{ code: newCode }])
        .select()
        .single();

      if (roomError) throw roomError;

      // Create initial file for the room
      await supabase
        .from('room_files')
        .insert([{ 
          room_id: room.id, 
          content: '// Start coding together!\nconsole.log("Welcome to DevCollab!");',
          language: 'javascript'
        }]);

      toast.success(`Room created: ${newCode}`);
      navigate(`/editor/${newCode}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to create room");
    } finally {
      setIsCreating(false);
    }
  };

  const joinRoom = async () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }

    setIsJoining(true);
    try {
      const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', roomCode.toUpperCase())
        .single();

      if (error || !room) {
        toast.error("Room not found");
        return;
      }

      navigate(`/editor/${roomCode.toUpperCase()}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to join room");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-card border border-primary/20 rounded-full mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-sm text-muted-foreground">Real-time collaborative coding</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Code <span className="gradient-text">Together</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Write code with your team in real-time. See changes instantly, chat while you work, 
              and build amazing things together.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Create Room Card */}
            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Create Room</h3>
                  <p className="text-muted-foreground">
                    Start a new coding session and invite your team
                  </p>
                </div>

                <Button 
                  onClick={createRoom}
                  disabled={isCreating}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  {isCreating ? "Creating..." : "Create Room"}
                </Button>
              </div>
            </Card>

            {/* Join Room Card */}
            <Card className="p-8 bg-card border-border hover:border-secondary/50 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:glow-purple transition-all duration-300">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Join Room</h3>
                  <p className="text-muted-foreground">
                    Enter a room code to join an existing session
                  </p>
                </div>

                <div className="space-y-3">
                  <Input
                    placeholder="Enter room code (e.g., ABC123)"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
                    className="bg-background border-border text-foreground"
                  />
                  <Button 
                    onClick={joinRoom}
                    disabled={isJoining || !roomCode.trim()}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    size="lg"
                  >
                    {isJoining ? "Joining..." : "Join Room"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold">Instant Sync</h4>
              <p className="text-sm text-muted-foreground">
                See changes as they happen in real-time
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold">Syntax Highlighting</h4>
              <p className="text-sm text-muted-foreground">
                Full Monaco editor with multiple languages
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold">Live Chat</h4>
              <p className="text-sm text-muted-foreground">
                Communicate while you code together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
