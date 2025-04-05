import { Star } from "lucide-react";
import first from "../../assets/first.png"
import second from "../../assets/second.png"
import male from "../../assets/male.png"

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Бидний хэрэглэгчид юу гэж байна вэ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Alchemist-аар суралцах дадлаа сайжруулсан мянга мянган оюутнуудтай нэгдээрэй
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-muted-foreground mb-4">
              "Alchemist намайг цагаа хэрхэн хянахыг бүрэн өөрчилсөн. Аналитик нь үнэхээр тустай!"
            </p>
            <div className="flex items-center gap-3">
            <img src={first} alt="Person" className="w-8"/>
              <div>
                <h4 className="font-medium">Н. Даваасүрэн</h4>
                <p className="text-sm text-muted-foreground">Их сургуулийн оюутан</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "Зорилго тодорхойлох функц нь намайг урам зоригтой болгодог нь гайхайлтай."
            </p>
            <div className="flex items-center gap-3">
            <img src={male} alt="Person" className="w-8"/>
              <div>
                <h4 className="font-medium">Э. Нямдорж</h4>
                <p className="text-sm text-muted-foreground">Ахлах ангийн сурагч</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-muted-foreground mb-4">
              "Үүлэн синхрончлолын функц нь гайхалтай - Би ямар ч төхөөрөмжөөс хичээлээ хянах боломжтой!"
            </p>
            <div className="flex items-center gap-3">
              <img src={second} alt="Person" className="w-8"/>
              <div>
                <h4 className="font-medium">Д. Болд</h4>
                <p className="text-sm text-muted-foreground">Их сургуулийн оюутан</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 