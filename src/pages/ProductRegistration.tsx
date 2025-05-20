
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Image, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  { value: "frutas", label: "Frutas" },
  { value: "legumes", label: "Legumes" },
  { value: "verduras", label: "Verduras" },
  { value: "carnes", label: "Carnes" },
  { value: "laticínios", label: "Laticínios" },
  { value: "mercearia", label: "Mercearia" },
  { value: "bebidas", label: "Bebidas" },
  { value: "limpeza", label: "Limpeza" },
  { value: "higiene", label: "Higiene" },
  { value: "outros", label: "Outros" }
];

const UNITS = [
  { value: "kg", label: "Quilograma (kg)" },
  { value: "g", label: "Grama (g)" },
  { value: "un", label: "Unidade (un)" },
  { value: "cx", label: "Caixa (cx)" },
  { value: "pct", label: "Pacote (pct)" },
  { value: "l", label: "Litro (l)" },
  { value: "ml", label: "Mililitro (ml)" }
];

export default function ProductRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState<"photo" | "details">("photo");
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUnit, setProductUnit] = useState("un");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle back navigation
  const handleBack = () => {
    if (step === "details" && productImage) {
      setStep("photo");
    } else {
      navigate(-1);
    }
  };

  // Handle camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      toast({
        title: "Erro",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive"
      });
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Take photo from camera
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame on canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to image data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setProductImage(imageDataUrl);
      
      // Stop camera after taking photo
      stopCamera();
      
      // Proceed to details step
      setStep("details");
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target?.result as string);
        setStep("details");
      };
      reader.readAsDataURL(file);
    }
  };

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Reset product image
  const resetImage = () => {
    setProductImage(null);
    setStep("photo");
  };

  // Save product
  const saveProduct = () => {
    if (!productName || !productCategory) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome e a categoria do produto.",
        variant: "destructive"
      });
      return;
    }

    // Format price value
    const priceValue = productPrice ? parseFloat(productPrice.replace(",", ".")) : 0;

    // Create product object
    const newProduct = {
      id: `product-${Date.now()}`,
      name: productName,
      category: productCategory,
      price: priceValue,
      unit: productUnit,
      image: productImage
    };

    // Show success message
    toast({
      title: "Produto cadastrado",
      description: `${productName} foi adicionado com sucesso!`,
    });

    // In a real app, you would save this to your database
    console.log("Novo produto:", newProduct);

    // Navigate back
    setTimeout(() => {
      navigate("/nova-lista");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-orange/10">
      <Header
        leftElement={
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
        title={step === "photo" ? "Adicionar Produto" : "Detalhes do Produto"}
        showSearch={false}
        showNotification={false}
      />
      
      <PageContainer>
        {step === "photo" ? (
          <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
              <h2 className="font-medium text-lg mb-2">Adicionar novo produto</h2>
              <p className="text-muted-foreground">
                Tire uma foto ou selecione uma imagem do produto
              </p>
            </div>
            
            {isCameraActive ? (
              <div className="w-full mb-6">
                <div className="relative bg-black rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="max-w-full max-h-full"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => stopCamera()}
                  >
                    <X className="h-5 w-5 mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    className="bg-feira-green hover:bg-feira-green-dark text-white"
                    onClick={takePhoto}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Tirar Foto
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col space-y-4 mb-6">
                <Button
                  className="bg-feira-green hover:bg-feira-green-dark text-white"
                  size="lg"
                  onClick={startCamera}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Usar Câmera
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={openFilePicker}
                >
                  <Image className="h-5 w-5 mr-2" />
                  Selecionar da Galeria
                </Button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            )}
            
            {/* Produtos adicionados recentemente - placeholder para futura implementação */}
            <Card className="w-full p-4 mt-6">
              <h3 className="font-medium mb-3">Produtos adicionados recentemente</h3>
              <p className="text-sm text-muted-foreground text-center py-6">
                Os produtos que você cadastrar aparecerão aqui para reutilização rápida.
              </p>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="relative bg-muted rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
                {productImage && (
                  <img 
                    src={productImage} 
                    alt="Produto" 
                    className="max-w-full max-h-full"
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                  onClick={resetImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="productName">Nome do produto</Label>
                <Input
                  id="productName"
                  placeholder="Ex: Banana Prata"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="productCategory">Categoria</Label>
                <Select value={productCategory} onValueChange={setProductCategory}>
                  <SelectTrigger id="productCategory" className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productPrice">Preço (R$)</Label>
                  <Input
                    id="productPrice"
                    placeholder="0,00"
                    value={productPrice}
                    onChange={(e) => {
                      // Allow only numbers and one comma
                      const value = e.target.value.replace(/[^0-9,]/g, '');
                      // Ensure only one comma
                      const parts = value.split(',');
                      if (parts.length > 2) {
                        return;
                      }
                      setProductPrice(value);
                    }}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="productUnit">Unidade</Label>
                  <Select value={productUnit} onValueChange={setProductUnit}>
                    <SelectTrigger id="productUnit" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Button
              className="bg-feira-green hover:bg-feira-green-dark text-white w-full"
              size="lg"
              onClick={saveProduct}
            >
              <Check className="h-5 w-5 mr-2" />
              Salvar Produto
            </Button>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
