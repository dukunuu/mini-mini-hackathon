import { BookOpen, Calendar, LineChart, Bell, Award, Zap, Clock, Cloud, BarChart3, Target, Trophy } from "lucide-react";

const features = [
  {
    title: "Хичээлийн удирдлага",
    description: "Хичээлээ нэг дороос хянаж, нийт оноо, шаардлагатай оноог тогтмол хадгалах",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Шаардлагатай ажлын хуваарь",
    description: "Шаардлагатай ажлын хуваарь, шаардлагатай оноог тогтмол хадгалах",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Ахиц дэвшил",
    description: "Ахиц дэвшил, ахиц оноог тогтмол хадгалах",
    icon: LineChart,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Шаардлагатай ажлын хуваарь",
    description: "Шаардлагатай ажлын хуваарь, шаардлагатай оноог тогтмол хадгалах",
    icon: Bell,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Ахиц дэвшил",
    description: "Ахиц дэвшил, ахиц оноог тогтмол хадгалах",
    icon: Award,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Smart Timer",
    description: "Track your study sessions with an intuitive timer",
    icon: Clock,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Motivation Tools",
    description: "Өдөр тутмын үргэлжлэл, зорилго болон ахиц дэвшлийг ашиглан урам зоригтой байg",
    icon: Zap,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Cloud Sync",
    description: "Өгөгдлөө хаана ч, ямар ч төхөөрөмжөөс хандах боломжтой",
    icon: Cloud,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to track your study progress and stay motivated
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
            <p className="text-muted-foreground">
              Easily track your study sessions with our intuitive timer
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
            <p className="text-muted-foreground">
              Set and track your study goals with visual progress indicators
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <p className="text-muted-foreground">
              Earn badges and rewards for reaching your study milestones
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-muted-foreground">
              Detailed insights into your study patterns and progress
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cloud Sync</h3>
            <p className="text-muted-foreground">
              Access your data anywhere with automatic cloud synchronization
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay: '1s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 animate-pulse">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
            <p className="text-muted-foreground">
              Start tracking with just one click using our quick action buttons
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 