import { Link } from "react-router";
import { Button } from "../ui/button";
import { BarChart3, Cloud, Zap } from "lucide-react";

export function WhatIsAthenify() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              What is Alchemist?
            </h2>
            <h3 className="text-xl font-semibold text-primary mb-6">
              Хичээлээ нэг дороос хянаж, нийт оноо, шаардлагатай оноог тогтмол хадгалах
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
              Alchemist бол их дээд сургуулийн оюутнуудын суралцах цагийг хянах шилдэг апп юм.
              Энэхүү апп нь оюутан, сурагчдын суралцах цагийг хурдан бөгөөд хялбар бүртгэх боломжийг олгож, таны суралцах үйл явцыг бодитоор хянах боломжийг бий болгодог.
              Өөрөөр хэлбэл, Alchemist нь таны суралцах цагийг өдөр бүр хянаж, үр дүнтэй суралцахад тусалдаг цагийн менежментийн хамгийн сайн хэрэгсэл юм!
              </p>
            </div>
          </div>
          
          <div className="space-y-8 animate-slide-in-right">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Alchemist юугаараа онцгой вэ?
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-primary/10 p-3 rounded-full animate-pulse">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Beautiful dashboard</h4>
                  <p className="text-muted-foreground">
                    View all your study metrics in one place
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-primary/10 p-3 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Cloud-based</h4>
                  <p className="text-muted-foreground">
                    Access your data anywhere, on any device
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                <div className="bg-primary/10 p-3 rounded-full animate-pulse" style={{ animationDelay: '1s' }}>
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Easy to use</h4>
                  <p className="text-muted-foreground">
                    Simple, intuitive interface for effortless tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 