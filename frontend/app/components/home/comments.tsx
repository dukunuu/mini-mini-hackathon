import { Star } from "lucide-react";

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
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students who have improved their study habits with Alchemist
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
              "Alchemist has completely transformed how I track my study time. The analytics are incredibly helpful!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse"></div>
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground">University Student</p>
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
              "The goal setting features keep me motivated, and I love seeing my progress over time."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div>
                <h4 className="font-medium">Michael Chen</h4>
                <p className="text-sm text-muted-foreground">High School Student</p>
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
              "The cloud sync feature is amazing - I can track my studies from any device!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div>
                <h4 className="font-medium">Emma Davis</h4>
                <p className="text-sm text-muted-foreground">College Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 