import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DonatePackage {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  color: string;
}

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<DonatePackage | null>(null);
  const [nickname, setNickname] = useState('');

  const packages: DonatePackage[] = [
    {
      id: 'vip',
      name: 'VIP',
      price: 199,
      color: 'from-blue-500 to-blue-700',
      features: [
        'Уникальный префикс [VIP]',
        'Доступ к VIP зонам',
        '5 /home точек',
        'Кит раз в день',
        'Приоритет в очереди'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 399,
      color: 'from-purple-500 to-purple-700',
      popular: true,
      features: [
        'Префикс [Premium]',
        'Все привилегии VIP',
        '10 /home точек',
        'Кит 2 раза в день',
        'Полет в лобби',
        'Персональный варп'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 699,
      color: 'from-amber-500 to-amber-700',
      features: [
        'Префикс [Elite]',
        'Все привилегии Premium',
        '20 /home точек',
        'Безлимитные киты',
        'Полет везде',
        'Смена ника',
        'Личный NPC'
      ]
    },
    {
      id: 'legend',
      name: 'Legend',
      price: 1299,
      color: 'from-red-500 to-red-700',
      features: [
        'Префикс [Legend]',
        'Все привилегии Elite',
        'Безлимит /home',
        'Бессмертие в PvP',
        'Уникальные эффекты',
        'Доступ к админ панели',
        'Эксклюзивные предметы'
      ]
    }
  ];

  const handlePurchase = () => {
    if (!nickname.trim()) {
      toast.error('Введите ваш никнейм');
      return;
    }
    if (!selectedPackage) {
      toast.error('Выберите донат-пакет');
      return;
    }
    toast.success(`Переход к оплате ${selectedPackage.name} для ${nickname}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">HolyTime</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-white/70 hidden md:block">play.holytime.su</span>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Icon name="User" className="mr-2" size={16} />
                Личный кабинет
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Купить донат
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Получи уникальные привилегии на сервере HolyTime
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`relative overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                  selectedPackage?.id === pkg.id 
                    ? 'ring-4 ring-purple-500' 
                    : 'hover:shadow-2xl'
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-purple-500">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">{pkg.price}₽</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Оформление покупки</CardTitle>
              <CardDescription>
                Введите ваш игровой никнейм и выберите донат-пакет
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nickname">Игровой никнейм</Label>
                <Input 
                  id="nickname"
                  placeholder="Steve"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              {selectedPackage && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Выбран пакет:</span>
                    <Badge className={`bg-gradient-to-r ${selectedPackage.color}`}>
                      {selectedPackage.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{selectedPackage.price}₽</span>
                  </div>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={handlePurchase}
                disabled={!selectedPackage || !nickname.trim()}
              >
                <Icon name="CreditCard" className="mr-2" size={20} />
                Перейти к оплате
              </Button>

              <div className="flex gap-4 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} />
                  Безопасная оплата
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={16} />
                  Мгновенная выдача
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Преимущества донат-системы
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Zap" size={32} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Мгновенная выдача
                  </h3>
                  <p className="text-white/60">
                    Привилегии активируются сразу после оплаты
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Безопасность
                  </h3>
                  <p className="text-white/60">
                    Защищенные платежи через проверенные системы
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Headphones" size={32} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Поддержка 24/7
                  </h3>
                  <p className="text-white/60">
                    Помощь в любое время при возникновении вопросов
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/20 backdrop-blur py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">HolyTime</span>
          </div>
          <p className="text-white/50 mb-6">
            Игровой сервер Minecraft
          </p>
          <div className="flex gap-4 justify-center mb-6">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Icon name="Users" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
          <p className="text-sm text-white/40">
            © 2024 HolyTime. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;