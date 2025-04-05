import { Link } from "react-router";
import { Share2, MessageCircle, Image, Link as LinkIcon, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12">
        <div className="flex">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Alchemist</h3>
            <p className="text-sm text-muted-foreground">
              Хичээл, хугацаа, ахиц дэвшил — бүгдийг нэг дор. Эрдмийн замналдаа илүү ухаалгаар, зорилготойгоор урагшилья!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Image className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <LinkIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Code className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Alchemist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
