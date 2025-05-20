import { useState, useEffect } from "react";
import { User, Users, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import { toast } from "@/components/ui/sonner";

interface UserProfile {
  name: string;
  email: string;
  photo?: string;
  isLoggedIn: boolean;
}

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Nome precisa ter pelo menos 2 caracteres"),
  confirmPassword: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : { name: "", email: "", isLoggedIn: false };
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [bubbles, setBubbles] = useState<{id: number, size: number, x: number, y: number, speed: number, color: string}[]>([]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Save profile to localStorage when it changes
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // Create interactive bubbles for background
  useEffect(() => {
    if (profile.isLoggedIn) return;
    
    // Colors from the existing palette
    const colors = [
      "bg-feira-green/30", 
      "bg-feira-orange/30",
      "bg-feira-green-light/30", 
      "bg-feira-orange-light/30"
    ];
    
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20-80px
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: (Math.random() * 0.5 + 0.1), // Different speeds
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setBubbles(initialBubbles);
    
    // Animate bubbles
    const animationFrame = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed > -10 ? bubble.y - bubble.speed : 110, // Reset position when off-screen
          x: bubble.y - bubble.speed <= 0 ? Math.random() * 100 : bubble.x // Randomize x when resetting
        }))
      );
    }, 50);
    
    return () => clearInterval(animationFrame);
  }, [profile.isLoggedIn]);

  const handleGoogleLogin = () => {
    // Simulate Google login
    const mockGoogleUser = {
      name: "Usuário Exemplo",
      email: "usuario@example.com",
      photo: "/lovable-uploads/68d3922e-f6f4-480e-ba91-5d86ee3a5c54.png", 
      isLoggedIn: true
    };
    
    setProfile(mockGoogleUser);
    setLoginModalOpen(false);
    toast.success("Login realizado com sucesso!");
  };

  const handleEmailLogin = (values: LoginFormValues) => {
    // Simulate email login
    const mockUser = {
      name: "Usuário Email",
      email: values.email,
      isLoggedIn: true
    };
    
    setProfile(mockUser);
    setLoginModalOpen(false);
    loginForm.reset();
    toast.success("Login realizado com sucesso!");
  };

  const handleEmailSignup = (values: SignupFormValues) => {
    // Simulate email signup
    const newUser = {
      name: values.name,
      email: values.email,
      isLoggedIn: true
    };
    
    setProfile(newUser);
    setLoginModalOpen(false);
    signupForm.reset();
    toast.success("Cadastro realizado com sucesso!");
  };

  const handleLogout = () => {
    setProfile({ name: "", email: "", isLoggedIn: false });
    toast.info("Você saiu da sua conta");
  };

  return (
    <>
      <Header title="Meu Perfil" />
      <PageContainer>
        <div className="space-y-6 py-6 px-4">
          {profile.isLoggedIn ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-feira-green">
                  {profile.photo ? (
                    <AvatarImage src={profile.photo} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="bg-feira-green/10 text-feira-green">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium mb-2">Minhas preferências</h3>
                  <p className="text-sm text-muted-foreground">Configure suas preferências de compras, produtos favoritos e notificações.</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium mb-2">Histórico de compras</h3>
                  <p className="text-sm text-muted-foreground">Veja suas listas salvas e histórico de compras anteriores.</p>
                </div>

                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Sair da conta
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-10 relative overflow-hidden">
              {/* Interactive background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {bubbles.map(bubble => (
                  <div 
                    key={bubble.id}
                    className={`absolute rounded-full ${bubble.color} animate-pulse-subtle`}
                    style={{
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      transition: 'top 0.5s linear'
                    }}
                  />
                ))}
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md relative z-10 border shadow-md">
                <div className="bg-muted rounded-full p-6 mx-auto">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-medium text-center mt-4">Entre na sua conta</h2>
                <p className="text-center text-muted-foreground max-w-xs mx-auto mt-2">
                  Acesse sua conta para sincronizar listas de compras e personalizar suas preferências
                </p>
                <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full">Entrar na conta</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <div className="space-y-4 py-4">
                      <h2 className="text-lg font-medium text-center">
                        {isSignup ? "Criar nova conta" : "Escolha como entrar"}
                      </h2>
                      
                      {!isSignup && (
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2" 
                          onClick={handleGoogleLogin}
                        >
                          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                            </g>
                          </svg>
                          Continuar com Google
                        </Button>
                      )}
                      
                      {!isSignup ? (
                        <>
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">
                                ou
                              </span>
                            </div>
                          </div>
                          
                          <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                              <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="seu@email.com" 
                                          type="email" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="******" 
                                          type="password" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button type="submit" className="w-full">Entrar</Button>
                            </form>
                          </Form>
                          
                          <div className="text-center text-sm">
                            <span className="text-muted-foreground">Não tem uma conta? </span>
                            <button 
                              className="text-primary hover:underline" 
                              onClick={() => setIsSignup(true)}
                            >
                              Criar conta
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Form {...signupForm}>
                            <form onSubmit={signupForm.handleSubmit(handleEmailSignup)} className="space-y-4">
                              <FormField
                                control={signupForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <User className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="Seu nome" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={signupForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="seu@email.com" 
                                          type="email" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={signupForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="******" 
                                          type="password" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={signupForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-input">
                                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                          placeholder="******" 
                                          type="password" 
                                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                                          {...field} 
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button type="submit" className="w-full">Criar conta</Button>
                            </form>
                          </Form>
                          
                          <div className="text-center text-sm">
                            <span className="text-muted-foreground">Já tem uma conta? </span>
                            <button 
                              className="text-primary hover:underline" 
                              onClick={() => setIsSignup(false)}
                            >
                              Fazer login
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
      <BottomNav />
    </>
  );
}
