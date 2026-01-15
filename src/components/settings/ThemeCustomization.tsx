import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Palette, Sun, Moon, RotateCcw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const presetColors = {
  primary: [
    { name: "Forest Green", value: "142 50% 18%" },
    { name: "Ocean Blue", value: "210 80% 45%" },
    { name: "Royal Purple", value: "270 60% 50%" },
    { name: "Crimson Red", value: "0 70% 50%" },
    { name: "Sunset Orange", value: "30 90% 55%" },
    { name: "Teal", value: "180 60% 40%" },
  ],
  secondary: [
    { name: "Tech Gold", value: "45 25% 65%" },
    { name: "Silver", value: "0 0% 70%" },
    { name: "Rose Gold", value: "15 40% 70%" },
    { name: "Copper", value: "25 50% 55%" },
    { name: "Platinum", value: "200 10% 75%" },
    { name: "Bronze", value: "30 40% 50%" },
  ],
  accent: [
    { name: "Mint", value: "150 60% 60%" },
    { name: "Coral", value: "10 80% 65%" },
    { name: "Lavender", value: "260 50% 70%" },
    { name: "Sky Blue", value: "200 70% 60%" },
    { name: "Peach", value: "25 80% 70%" },
    { name: "Lime", value: "80 60% 50%" },
  ],
};

const ThemeCustomization = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  const [colors, setColors] = useState({
    primary: "142 50% 18%",
    secondary: "45 25% 65%",
    accent: "150 60% 60%",
  });

  const [customColors, setCustomColors] = useState({
    primary: "#1A3328",
    secondary: "#C5BA99",
    accent: "#4ADE80",
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0 0% 50%";

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const hslToHex = (hsl: string): string => {
    const parts = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
    if (!parts) return "#000000";

    const h = parseInt(parts[1]) / 360;
    const s = parseInt(parts[2]) / 100;
    const l = parseInt(parts[3]) / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const applyColor = (type: "primary" | "secondary" | "accent", hslValue: string) => {
    setColors((prev) => ({ ...prev, [type]: hslValue }));
    setCustomColors((prev) => ({ ...prev, [type]: hslToHex(hslValue) }));

    // Apply to CSS variables (in a real app, this would persist to backend)
    const root = document.documentElement;
    if (type === "primary") {
      root.style.setProperty("--primary", hslValue);
    } else if (type === "secondary") {
      root.style.setProperty("--secondary", hslValue);
    } else {
      root.style.setProperty("--accent", hslValue);
    }
  };

  const handleCustomColorChange = (type: "primary" | "secondary" | "accent", hexValue: string) => {
    setCustomColors((prev) => ({ ...prev, [type]: hexValue }));
    const hslValue = hexToHsl(hexValue);
    setColors((prev) => ({ ...prev, [type]: hslValue }));

    const root = document.documentElement;
    if (type === "primary") {
      root.style.setProperty("--primary", hslValue);
    } else if (type === "secondary") {
      root.style.setProperty("--secondary", hslValue);
    } else {
      root.style.setProperty("--accent", hslValue);
    }
  };

  const saveTheme = () => {
    localStorage.setItem("customTheme", JSON.stringify({ colors, isDarkMode }));
    toast({
      title: "Tema salvo!",
      description: "Suas preferências de tema foram salvas com sucesso.",
    });
  };

  const resetTheme = () => {
    const defaultColors = {
      primary: "142 50% 18%",
      secondary: "45 25% 65%",
      accent: "150 60% 60%",
    };

    setColors(defaultColors);
    setCustomColors({
      primary: "#1A3328",
      secondary: "#C5BA99",
      accent: "#4ADE80",
    });

    const root = document.documentElement;
    root.style.removeProperty("--primary");
    root.style.removeProperty("--secondary");
    root.style.removeProperty("--accent");

    toast({
      title: "Tema restaurado",
      description: "O tema foi restaurado para as configurações padrão.",
    });
  };

  const ColorSwatch = ({
    color,
    isSelected,
    onClick,
    name,
  }: {
    color: string;
    isSelected: boolean;
    onClick: () => void;
    name: string;
  }) => (
    <button
      onClick={onClick}
      className={`group relative w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
        isSelected ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110" : ""
      }`}
      style={{ backgroundColor: `hsl(${color})` }}
      title={name}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check className="w-5 h-5 text-white drop-shadow-lg" />
        </div>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Theme Mode Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Modo do Tema</CardTitle>
              <CardDescription>Escolha entre tema claro ou escuro</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/30">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <div>
                <p className="font-medium">{isDarkMode ? "Modo Escuro" : "Modo Claro"}</p>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode
                    ? "Interface com fundo escuro, ideal para ambientes com pouca luz"
                    : "Interface com fundo claro, ideal para ambientes iluminados"}
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Primary Color Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-inner"
                style={{ backgroundColor: `hsl(${colors.primary})` }}
              />
              <div>
                <CardTitle className="text-lg">Cor Primária</CardTitle>
                <CardDescription>Cor principal da interface (botões, links, destaques)</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="primary-custom" className="text-sm text-muted-foreground">
                Personalizada:
              </Label>
              <input
                type="color"
                id="primary-custom"
                value={customColors.primary}
                onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-2 border-border/50 hover:border-primary transition-colors"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {presetColors.primary.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color.value}
                name={color.name}
                isSelected={colors.primary === color.value}
                onClick={() => applyColor("primary", color.value)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Color Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-inner"
                style={{ backgroundColor: `hsl(${colors.secondary})` }}
              />
              <div>
                <CardTitle className="text-lg">Cor Secundária</CardTitle>
                <CardDescription>Usada em elementos de suporte e backgrounds</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="secondary-custom" className="text-sm text-muted-foreground">
                Personalizada:
              </Label>
              <input
                type="color"
                id="secondary-custom"
                value={customColors.secondary}
                onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-2 border-border/50 hover:border-primary transition-colors"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {presetColors.secondary.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color.value}
                name={color.name}
                isSelected={colors.secondary === color.value}
                onClick={() => applyColor("secondary", color.value)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accent Color Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-inner"
                style={{ backgroundColor: `hsl(${colors.accent})` }}
              />
              <div>
                <CardTitle className="text-lg">Cor de Destaque</CardTitle>
                <CardDescription>Usada em notificações, badges e elementos de atenção</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="accent-custom" className="text-sm text-muted-foreground">
                Personalizada:
              </Label>
              <input
                type="color"
                id="accent-custom"
                value={customColors.accent}
                onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-2 border-border/50 hover:border-primary transition-colors"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {presetColors.accent.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color.value}
                name={color.name}
                isSelected={colors.accent === color.value}
                onClick={() => applyColor("accent", color.value)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Pré-visualização</CardTitle>
          <CardDescription>Veja como as cores ficam em elementos da interface</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <Button className="w-full mb-3" style={{ backgroundColor: `hsl(${colors.primary})` }}>
                Botão Primário
              </Button>
              <p className="text-sm text-center text-muted-foreground">Ações principais</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <div
                className="w-full h-10 rounded-lg mb-3 flex items-center justify-center text-sm font-medium"
                style={{ backgroundColor: `hsl(${colors.secondary})`, color: "hsl(var(--foreground))" }}
              >
                Elemento Secundário
              </div>
              <p className="text-sm text-center text-muted-foreground">Backgrounds e suporte</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <div
                className="w-full h-10 rounded-lg mb-3 flex items-center justify-center text-sm font-medium text-white"
                style={{ backgroundColor: `hsl(${colors.accent})` }}
              >
                Badge de Destaque
              </div>
              <p className="text-sm text-center text-muted-foreground">Notificações e alertas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={resetTheme} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Restaurar Padrão
        </Button>
        <Button onClick={saveTheme} className="gap-2 bg-gradient-to-r from-primary to-primary/80">
          <Check className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default ThemeCustomization;
