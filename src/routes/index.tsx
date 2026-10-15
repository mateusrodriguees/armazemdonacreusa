import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Instagram, MessageCircle, ShoppingBasket, Sprout, Wheat, Music2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import farmIcon from "@/assets/farmIcon.jpg";
import { link } from "fs";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Armazém da Dona Creusa | Direto da chácara" },
      { name: "description", content: "Produtos artesanais direto da chácara para sua casa. Encontre a vitrine e acompanhe o Armazém da Dona Creusa." },
      { property: "og:title", content: "Armazém da Dona Creusa" },
      { property: "og:description", content: "Produtos artesanais direto da chácara para sua casa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const links = [
  { label: "Ver Vitrine de Produtos", icon: ShoppingBasket, featured: true, message: "Nossa vitrine estará disponível em breve." },
  { label: "Acompanhe no Instagram", icon: Instagram, featured: false, url: "https://www.instagram.com/creusa.silva.102" },
  { label: "Falar no WhatsApp", icon: MessageCircle, featured: false, url:"https://wa.me/5561992524666?text=Ol%C3%A1%2C%20gostaria%20de%20realizar%20uma%20encomenda%20na%20sua%20lojinha!" },
  { label: "Nossos Vídeos no TikTok", icon: Music2, featured: false, url: "O link do nosso TikTok ainda não está disponível." },
];

function Index() {
  const [selected, setSelected] = useState<(typeof links)[number] | null>(null);
  return (
    <main className="bio-page">
      <Wheat className="botanical botanical-left" aria-hidden="true" />
      <Wheat className="botanical botanical-right" aria-hidden="true" />
      <div className="bio-content">
        <header>
          <p className="brand-eyebrow">DA CHÁCARA, COM CARINHO</p>
          <img className="brand-seal" src={farmIcon} alt="Selo rústico do Armazém, com uma fechadura antiga e ramos" width={112} height={112} />
          <h1 className="brand-title">Armazém da<br /><span>Dona Creusa</span></h1>
          <p className="brand-subtitle">Produtos artesanais direto da chácara para sua casa.</p>
          <div className="brand-divider" aria-hidden="true"><Sprout size={22} strokeWidth={1.3} /></div>
        </header>
       <nav className="bio-links" aria-label="Links do Armazém">
          {links.map(({ icon: Icon, ...link }) => (
            <Button
              key={link.label}
              variant={link.featured ? "bioFeatured" : "bio"}
              asChild={Boolean("url" in link && link.url)}
              onClick={!("url" in link && link.url) ? () => setSelected({ ...link, icon: Icon }) : undefined}
            >
              {"url" in link && link.url ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="link-icon"><Icon aria-hidden="true" /></span>
                  <span className="min-w-0">{link.label}</span>
                  <ArrowUpRight className="link-arrow" aria-hidden="true" />
                </a>
              ) : (
                <>
                  <span className="link-icon"><Icon aria-hidden="true" /></span>
                  <span className="min-w-0">{link.label}</span>
                  <ArrowUpRight className="link-arrow" aria-hidden="true" />
                </>
              )}
            </Button>
          ))}
        </nav>
        <footer className="bio-footer">
          <Heart className="footer-heart" aria-hidden="true" />

          <p>Feito com carinho na chácara • Armazém da Dona Creusa 2026</p>

        </footer>
      </div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="destination-dialog">
          <DialogHeader>
            <DialogTitle>{selected?.label}</DialogTitle>
            <DialogDescription>{selected?.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
