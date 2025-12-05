import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DonatePackage {
  id: string;
  name: string;
  priceForever: number;
  priceMonth?: number;
  features: string[];
  popular?: boolean;
  color: string;
  gradient: string;
  emoji: string;
  description: string;
  free?: boolean;
  custom?: boolean;
}

interface Review {
  name: string;
  rating: number;
  text: string;
  emoji: string;
}

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<DonatePackage | null>(null);
  const [nickname, setNickname] = useState('');
  const [duration, setDuration] = useState<'forever' | 'month'>('forever');
  const [tokenCount, setTokenCount] = useState(1);
  const [balanceAmount, setBalanceAmount] = useState(5);

  const packages: DonatePackage[] = [
    {
      id: 'baron',
      name: 'Барон',
      priceForever: 0,
      color: 'text-gray-400',
      gradient: 'from-gray-400 to-gray-600',
      emoji: '🛡️',
      free: true,
      description: '⚕ Префикс в чате и табе: [Барон] ВашНик',
      features: [
        '› /kit Барон ⇨ Получить набор Барона',
        '› /salary ⇨ Получить зарплату',
        '› /crawl ⇨ Сменить позу: красться',
        'Доступно Точек домов: 2',
        'Регионов (Гриф): 2 по 40,000 блоков',
        'Регионов (Анка): 3 блоков',
        'Слотов на Аукционе: 6',
        'Задержка телепорта: 7 сек'
      ]
    },
    {
      id: 'strazh',
      name: 'Страж',
      priceForever: 0,
      color: 'text-green-400',
      gradient: 'from-green-400 to-green-600',
      emoji: '⚔️',
      free: true,
      description: '⚕ Префикс в чате и табе: [Страж] ВашНик',
      features: [
        '› /kit Страж ⇨ Получить набор Стража',
        '› /suicide ⇨ Покончить жизнь самоубийством',
        '› /dchat ⇨ Воспользоваться Донат-Чатом',
        'Доступно Точек домов: 2',
        'Регионов (Гриф): 2 по 45,000 блоков',
        'Регионов (Анка): 3 блоков',
        'Слотов на Аукционе: 7',
        'Задержка телепорта: 6 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'hero',
      name: 'Герой',
      priceForever: 0,
      color: 'text-blue-400',
      gradient: 'from-blue-400 to-blue-600',
      emoji: '🏅',
      free: true,
      description: '⚕ Префикс в чате и табе: [Герой] ВашНик',
      features: [
        '› /kit Герой ⇨ Получить набор Героя',
        '› /top ⇨ Телепортация вверх',
        '› /hat ⇨ Надеть блок на голову',
        'Доступно Точек домов: 2',
        'Регионов (Гриф): 2 по 50,000 блоков',
        'Регионов (Анка): 4 блоков',
        'Слотов на Аукционе: 8',
        'Задержка телепорта: 6 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'aspid',
      name: 'Аспид',
      priceForever: 0,
      color: 'text-teal-400',
      gradient: 'from-teal-400 to-teal-600',
      emoji: '🐉',
      free: true,
      description: '⚕ Префикс в чате и табе: [Аспид] ВашНик',
      features: [
        '› /kit Аспид ⇨ Получить набор Аспида',
        '› /clear ⇨ Очистить инвентарь',
        '› /feed ⇨ Восстановить голод',
        '› /heal ⇨ Восстановить здоровье',
        '› /me ⇨ Написать в чат Реакции',
        'Доступно Точек домов: 2',
        'Регионов (Гриф): 2 по 60,000 блоков',
        'Регионов (Анка): 4 блоков',
        'Слотов на Аукционе: 9',
        'Задержка телепорта: 6 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'squid',
      name: 'Сквид',
      priceForever: 9,
      priceMonth: 4,
      color: 'text-cyan-400',
      gradient: 'from-cyan-400 to-cyan-600',
      emoji: '🦑',
      description: '⚕ Префикс в чате и табе: [Сквид] ВашНик',
      features: [
        '› /kit Сквид ⇨ Получить набор Сквида',
        '› /back ⇨ Вернуться на место смерти',
        '› /ec ⇨ Открыть Эндер Сундук',
        '› /wbench ⇨ Открыть портативный Верстак',
        '› /ad ⇨ Написать в чат Рекламы',
        '› /buy ⇨ Написать в чат Покупки',
        '› /sell ⇨ Написать в чат Продажи',
        '› /name ⇨ Изменить название предмета',
        'Доступно Точек домов: 3',
        'Регионов (Гриф): 3 по 75,000 блоков',
        'Регионов (Анка): 5 блоков',
        'Слотов на Аукционе: 10',
        'Задержка телепорта: 5 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'glava',
      name: 'Глава',
      priceForever: 17,
      priceMonth: 7,
      color: 'text-indigo-400',
      gradient: 'from-indigo-400 to-indigo-600',
      emoji: '👑',
      description: '⚕ Префикс в чате и табе: [Глава] ВашНик',
      features: [
        '› /kit Глава ⇨ Получить набор Главы',
        '› /salary ⇨ Получить зарплату',
        '› /bc ⇨ Написать в чат Объявления',
        '› /ext ⇨ Потушить себя командой',
        '› /am toggle ⇨ Отключить Авто-сообщения',
        '› /msgtoggle ⇨ Отключить Личные сообщения',
        '› /paytoggle ⇨ Отключить получение платежей',
        '› /tptoggle ⇨ Отключить телепортации',
        '› /feed Ник ⇨ Покормить игрока',
        '› /heal Ник ⇨ Вылечить игрока',
        '› /exp ⇨ Получить бесплатный опыт',
        'Доступно Точек домов: 3',
        'Регионов (Гриф): 4 по 100,000 блоков',
        'Регионов (Анка): 6 блоков',
        'Слотов на Аукционе: 11',
        'Задержка телепорта: 4 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'elite',
      name: 'Элита',
      priceForever: 49,
      priceMonth: 25,
      color: 'text-purple-400',
      gradient: 'from-purple-400 to-purple-600',
      emoji: '💎',
      popular: true,
      description: '⚕ Префикс в чате и табе: [Элита] ВашНик',
      features: [
        '› /kit Элита ⇨ Получить набор Элиты',
        '› /time ⇨ Установить время',
        '› /weather ⇨ Установить погоду',
        '› /loom ⇨ Открыть Ткацкий станок',
        '› /carttable ⇨ Открыть Стол картографа',
        '› /msgtoggle ⇨ Отключить Личные сообщения',
        '› /beezooka ⇨ Выстрельнуть пчелой',
        '› /kittycannon ⇨ Выстрелить котом',
        '› /firework ⇨ Настроить феерверк',
        '› /name ⇨ Изменить назв. предмета цветным',
        'Доступно Точек домов: 3',
        'Регионов (Гриф): 5 по 150,000 блоков',
        'Регионов (Анка): 7 блоков',
        'Слотов на Аукционе: 12',
        'Задержка телепорта: 4 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'titan',
      name: 'Титан',
      priceForever: 79,
      priceMonth: 55,
      color: 'text-orange-400',
      gradient: 'from-orange-400 to-orange-600',
      emoji: '⚡',
      description: '⚕ Префикс в чате и табе: [Титан] ВашНик',
      features: [
        '› /kit Титан ⇨ Получить набор Титана',
        '› /jump ⇨ Телепортация на блок взгляда',
        '› /afk ⇨ Установить режим "Афк"',
        '› /setwarp ⇨ Установить точку варпа',
        '› /delwarp ⇨ Удалить точку варпа',
        '› /repair ⇨ Починить вещь в руке',
        'Не кикает за Афк',
        'Доступно Точек домов: 4',
        'Регионов (Гриф): 6 по 200,000 блоков',
        'Регионов (Анка): 8 блоков',
        'Слотов на Аукционе: 13',
        'Задержка телепорта: 3 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'prince',
      name: 'Принц',
      priceForever: 129,
      priceMonth: 75,
      color: 'text-pink-400',
      gradient: 'from-pink-400 to-pink-600',
      emoji: '🌟',
      description: '⚕ Префикс в чате и табе: [Принц] ВашНик',
      features: [
        '› /kit Принц ⇨ Получить набор Принца',
        '› /smithtable ⇨ Открыть стол Кузнеца',
        '› /stonecutter ⇨ Открыть Камнерез',
        '› /grindstone ⇨ Открыть Точило',
        'Доступно Точек домов: 5',
        'Регионов (Гриф): 7 по 250,000 блоков',
        'Регионов (Анка): 9 блоков',
        'Слотов на Аукционе: 14',
        'Задержка телепорта: 3 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'knyaz',
      name: 'Князь',
      priceForever: 249,
      priceMonth: 125,
      color: 'text-red-400',
      gradient: 'from-red-400 to-red-600',
      emoji: '🔥',
      description: '⚕ Префикс в чате и табе: [Князь] ВашНик',
      features: [
        '› /kit Князь ⇨ Получить набор Князя',
        '› /fly ⇨ Включить режим полёта',
        '› /amute ⇨ Выдать МУТ игроку',
        '› /enchant ⇨ Зачаровать предмет в руке',
        '› /anvil ⇨ Открыть портативную Наковальню',
        '› /speed ⇨ Установить скорость передвижения',
        '› /salary ⇨ Получить зарплату',
        '› /exp ⇨ Получить бесплатный опыт',
        'Доступно Точек домов: 7',
        'Регионов (Гриф): 10 по 350,000 блоков',
        'Регионов (Анка): 10 блоков',
        'Слотов на Аукционе: 15',
        'Задержка телепорта: 2 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'duke',
      name: 'Герцог',
      priceForever: 499,
      priceMonth: 245,
      color: 'text-amber-400',
      gradient: 'from-amber-400 to-amber-600',
      emoji: '🏆',
      description: '⚕ Префикс в чате и табе: [Герцог] ВашНик',
      features: [
        '› /kit Герцог ⇨ Получить набор Герцога',
        '› /salary ⇨ Получить зарплату',
        '› /exp ⇨ Получить бесплатный опыт',
        'Доступно Точек домов: 10',
        'Регионов (Гриф): 15 по 500,000 блоков',
        'Регионов (Анка): 15 блоков',
        'Слотов на Аукционе: 18',
        'Задержка телепорта: 1 сек',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'sponsor',
      name: 'Спонсор',
      priceForever: 850,
      priceMonth: 494,
      color: 'text-yellow-400',
      gradient: 'from-yellow-400 to-yellow-600',
      emoji: '💰',
      description: '⚕ Префикс в чате и табе: [Спонсор] ВашНик',
      features: [
        '› /kit Спонсор ⇨ Получить набор Спонсора',
        '› /salary ⇨ Получить зарплату',
        '› /exp ⇨ Получить бесплатный опыт',
        'Вход на заполненный сервер',
        'Нет задержки телепортации',
        'Доступно Точек домов: 15',
        'Регионов (Анка): 20 блоков',
        'Слотов на Аукционе: 20',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'major',
      name: 'Мажор',
      priceForever: 1250,
      priceMonth: 675,
      color: 'text-emerald-400',
      gradient: 'from-emerald-400 to-emerald-600',
      emoji: '💸',
      description: '⚕ Префикс в чате и табе: [Мажор] ВашНик',
      features: [
        '› /kit Мажор ⇨ Получить набор Мажора',
        '› /salary ⇨ Получить зарплату',
        '› /exp ⇨ Получить бесплатный опыт',
        'Вход на заполненный сервер',
        'Нет задержки телепортации',
        'Доступно Точек домов: 25',
        'Регионов (Анка): 30 блоков',
        'Слотов на Аукционе: 30',
        '✔ Возможности привилегии ниже'
      ]
    },
    {
      id: 'intern',
      name: 'Стажер',
      priceForever: 0,
      color: 'text-green-500',
      gradient: 'from-green-500 to-green-700',
      emoji: '🔰',
      custom: true,
      description: '⚕ Кастомная привилегия для модераторов',
      features: [
        'Вызвать игрока на проверку /revise start (ник)',
        'Discord - AnyDesk 5',
        'Забанить игрока /tempban (строго по правилам)',
        'Замутить игрока /tempmute (строго по правилам)',
        '✨ Специальные возможности модерации',
        '📋 Доступ к логам сервера'
      ]
    }
  ];

  const reviews: Review[] = [
    { name: 'Lololoshka', rating: 5, text: 'Отличный сервер! Играю каждый день 🎮', emoji: '⭐' },
    { name: 'FixPlay', rating: 5, text: 'Лучший из серверов, что я видел! 🔥', emoji: '🎯' },
    { name: 'Смотрящий', rating: 5, text: 'Очень круто, всем советую! 👍', emoji: '🏆' },
    { name: 'Player_2847', rating: 5, text: 'Администрация топ! Быстро решают вопросы 💪', emoji: '😊' },
    { name: 'MegaKriper', rating: 5, text: 'Донат стоит своих денег, всё работает! 💎', emoji: '🤑' },
    { name: 'ProGamer228', rating: 5, text: 'Играю уже полгода, сервер огонь! 🚀', emoji: '🎮' },
    { name: 'LuckySteve', rating: 5, text: 'Отличные ивенты и активное комьюнити! 🎉', emoji: '🎊' },
    { name: 'DiamondHunter', rating: 5, text: 'Много уникальных фишек, не заскучаешь! ⚔️', emoji: '💎' },
    { name: 'CraftMaster99', rating: 4, text: 'Хороший сервер, но иногда лагает 🤔', emoji: '👌' },
    { name: 'RedstoneKing', rating: 5, text: 'Техподдержка отвечает мгновенно! 👏', emoji: '⚡' },
    { name: 'BuilderPro', rating: 4, text: 'Много возможностей для строительства 🏗️', emoji: '🏠' },
    { name: 'PvPLegend', rating: 5, text: 'PvP арена просто бомба! 💥', emoji: '⚔️' },
    { name: 'NoobSlayer', rating: 4, text: 'Отличный баланс донат-привилегий 🎯', emoji: '✨' },
    { name: 'CreativeGenius', rating: 5, text: 'Креативный режим супер удобный! 🎨', emoji: '🖌️' },
    { name: 'SurvivalKing', rating: 4, text: 'Выживание интересное, но хотелось бы больше квестов 📋', emoji: '🗺️' },
    { name: 'EnderDragon777', rating: 5, text: 'Босы сложные, но интересные! 🐉', emoji: '🔥' },
    { name: 'NetherExplorer', rating: 4, text: 'Незер хорошо проработан 🌋', emoji: '🔴' },
    { name: 'FarmingPro', rating: 5, text: 'Фермы работают стабильно! 🌾', emoji: '🚜' },
    { name: 'TradeMaster', rating: 4, text: 'Экономика на сервере сбалансирована 💰', emoji: '💵' },
    { name: 'MobHunter', rating: 5, text: 'Кастомные мобы добавляют драйва! 👾', emoji: '🎃' },
    { name: 'EnchantWizard', rating: 5, text: 'Система зачарований улучшенная 📚', emoji: '✨' },
    { name: 'PortalMaster', rating: 4, text: 'Варпы удобные, быстро перемещаешься 🌀', emoji: '🌐' },
    { name: 'ChestKeeper', rating: 5, text: 'Регионы защищены надежно! 🔒', emoji: '🛡️' },
    { name: 'MinecartRider', rating: 4, text: 'Транспорт работает без багов 🚂', emoji: '🚊' },
    { name: 'CommandBlock', rating: 5, text: 'Плагины не конфликтуют, всё стабильно! ⚙️', emoji: '🔧' },
    { name: 'SkyBuilder', rating: 4, text: 'Скайблок режим интересный 🏝️', emoji: '☁️' },
    { name: 'CaveExplorer', rating: 5, text: 'Много секретных локаций! 🗿', emoji: '🔦' },
    { name: 'LavaSwimmer', rating: 3, text: 'Хороший сервер, но в лаве всё равно умираю 😅', emoji: '🔥' },
    { name: 'WaterMage', rating: 4, text: 'Подводный мир красиво оформлен 🌊', emoji: '🐠' },
    { name: 'ForestGuard', rating: 5, text: 'Биомы разнообразные и живописные! 🌲', emoji: '🌳' },
    { name: 'DesertNomad', rating: 4, text: 'В пустыне есть уникальные структуры 🏜️', emoji: '🐪' },
    { name: 'SnowKing', rating: 5, text: 'Зимний биом с крутыми данжами! ❄️', emoji: '⛄' },
    { name: 'JungleHunter', rating: 4, text: 'Джунгли полны сюрпризов 🌴', emoji: '🐒' },
    { name: 'MountainClimber', rating: 5, text: 'Горы высокие, виды шикарные! ⛰️', emoji: '🧗' },
    { name: 'VillageChief', rating: 3, text: 'Деревни живые, но мало жителей 🏘️', emoji: '👨‍🌾' },
    { name: 'DragonSlayer', rating: 5, text: 'Убил дракона с друзьями, эпично! 🐲', emoji: '⚔️' },
    { name: 'WitherBoss', rating: 4, text: 'Визер сложный, но победил! 💀', emoji: '👻' },
    { name: 'BeaconMaster', rating: 5, text: 'Маяки дают крутые эффекты! 📡', emoji: '💡' },
    { name: 'ShulkerLoot', rating: 4, text: 'Шалкеры удобные для хранения 📦', emoji: '🎁' },
    { name: 'ElytraFlyer', rating: 5, text: 'Летать на элитрах одно удовольствие! 🦅', emoji: '✈️' },
    { name: 'TridentThrower', rating: 4, text: 'Трезубец работает отлично 🔱', emoji: '🌊' },
    { name: 'CrossbowSniper', rating: 5, text: 'Арбалет мощный! 🎯', emoji: '🏹' },
    { name: 'ShieldDefender', rating: 3, text: 'Щит иногда глючит, но в целом норм 🛡️', emoji: '🔰' },
    { name: 'TNTExpert', rating: 5, text: 'Взрывы работают реалистично! 💣', emoji: '💥' },
    { name: 'RedstonePro', rating: 4, text: 'Редстоун механизмы не лагают 🔴', emoji: '⚙️' }
  ];

  const handlePurchase = async (customAmount?: number, customPackage?: string) => {
    if (!nickname.trim()) {
      toast.error('Введите ваш никнейм');
      return;
    }
    
    let finalAmount = customAmount;
    const finalPackage = customPackage || selectedPackage?.name;
    const finalPackageId = customPackage || selectedPackage?.id;

    if (!customAmount && !selectedPackage) {
      toast.error('Выберите привилегию');
      return;
    }

    if (!customAmount && selectedPackage) {
      if (selectedPackage.free) {
        toast.error('Эта привилегия бесплатная');
        return;
      }
      finalAmount = duration === 'forever' ? selectedPackage.priceForever : (selectedPackage.priceMonth || selectedPackage.priceForever);
    }

    const loadingToast = toast.loading('Создание платежа...');

    try {
      const paymentResponse = await fetch('https://functions.poehali.dev/2d1e1ffb-9572-4bee-8c12-307b5ae42cb4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          package_id: finalPackageId,
          package_name: finalPackage,
          amount: finalAmount
        })
      });

      const paymentData = await paymentResponse.json();

      if (paymentResponse.ok && paymentData.payment_url) {
        await fetch('https://functions.poehali.dev/7b390131-ec1a-46f0-aad1-43db33ceb713', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoice_id: paymentData.invoice_id,
            nickname: nickname,
            package_id: finalPackageId,
            package_name: finalPackage,
            amount: finalAmount
          })
        });

        toast.dismiss(loadingToast);
        toast.success('Перенаправление на оплату...');
        setTimeout(() => {
          window.location.href = paymentData.payment_url;
        }, 500);
      } else {
        toast.dismiss(loadingToast);
        toast.error(paymentData.error || 'Ошибка создания платежа');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Ошибка соединения с сервером');
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-green-950">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-green-500/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/projects/cbcd8df0-1909-44c8-9ac2-f2d45c40ef3e/files/eeca32db-22a4-4669-923e-c3f88b821c3f.jpg" 
                alt="FreeTime Logo" 
                className="h-12 w-12 rounded-lg object-cover"
              />
              <span className="text-3xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">FreeTime</span>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              <span className="text-green-300 text-sm md:text-base">📍 FreeTime.gomc.me</span>
              <Button variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10 text-xs md:text-sm">
                <Icon name="MessageCircle" className="mr-1" size={14} />
                Discord
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              ⛏️ Магазин FreeTime ⛏️
            </h1>
            <p className="text-lg md:text-xl text-green-200 max-w-3xl mx-auto mb-6">
              🎮 Получи уникальные привилегии на лучшем Minecraft сервере! 🎮
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center text-sm md:text-base">
              <a href="https://t.me/FreeTimeOffical" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-300 hover:text-blue-200">
                <Icon name="Send" size={16} />
                Telegram канал
              </a>
              <a href="https://discord.gg/WBrBCpUbkc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200">
                <Icon name="MessageSquare" size={16} />
                Discord сервер
              </a>
              <a href="https://t.me/FreeTimeRazdathi_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-300 hover:text-purple-200">
                <Icon name="Bot" size={16} />
                🎁 Бот с розыгрышами
              </a>
            </div>
            <div className="mt-4 text-green-300 text-sm">
              💬 Поддержка: <a href="https://t.me/InfernoClient" className="text-blue-300 hover:underline">@InfernoClient</a> | 
              <a href="https://vk.com/minercasoft" className="text-blue-300 hover:underline ml-1">VK: minercasoft</a>
            </div>
          </div>

          <Card className="max-w-md mx-auto mb-8 bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-200">🎮 Введите никнейм</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Ваш игровой ник"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-green-950/50 border-green-500/30 text-green-100"
              />
            </CardContent>
          </Card>

          <Tabs defaultValue="privileges" className="mb-12">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-green-900/30">
              <TabsTrigger value="privileges">Привилегии</TabsTrigger>
              <TabsTrigger value="tokens">Токены</TabsTrigger>
              <TabsTrigger value="balance">Биржа</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>

            <TabsContent value="privileges" className="mt-8">
              <div className="flex justify-center mb-6">
                <div className="bg-green-900/30 p-1 rounded-lg inline-flex">
                  <Button
                    variant={duration === 'forever' ? 'default' : 'ghost'}
                    onClick={() => setDuration('forever')}
                    className={duration === 'forever' ? 'bg-green-600' : ''}
                  >
                    ♾️ Навсегда
                  </Button>
                  <Button
                    variant={duration === 'month' ? 'default' : 'ghost'}
                    onClick={() => setDuration('month')}
                    className={duration === 'month' ? 'bg-green-600' : ''}
                  >
                    📅 На месяц
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.id}
                    className={`relative overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                      pkg.custom ? 'bg-green-500/10 border-green-500' : 'bg-gray-900/40'
                    } ${
                      selectedPackage?.id === pkg.id 
                        ? 'ring-2 ring-green-400' 
                        : 'hover:shadow-xl'
                    } border-green-500/20`}
                    onClick={() => !pkg.free && setSelectedPackage(pkg)}
                  >
                    <div className={`h-1 bg-gradient-to-r ${pkg.gradient}`} />
                    {pkg.popular && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                        ⭐ ТОП
                      </Badge>
                    )}
                    {pkg.free && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        🎁 FREE
                      </Badge>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{pkg.emoji}</span>
                        <CardTitle className={`text-xl ${pkg.color}`}>{pkg.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs text-gray-300">
                        {pkg.description}
                      </CardDescription>
                      <div className="pt-2">
                        {pkg.free ? (
                          <span className="text-2xl font-bold text-green-400">БЕСПЛАТНО</span>
                        ) : pkg.custom ? (
                          <Button 
                            size="sm" 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Свяжитесь с администрацией для получения');
                            }}
                          >
                            📞 Связаться
                          </Button>
                        ) : (
                          <>
                            {duration === 'forever' ? (
                              <span className="text-2xl font-bold text-green-300">{pkg.priceForever}₽</span>
                            ) : (
                              <span className="text-2xl font-bold text-green-300">{pkg.priceMonth || pkg.priceForever}₽</span>
                            )}
                            <span className="text-xs text-gray-400 ml-2">
                              {duration === 'forever' ? '♾️ навсегда' : '📅 /мес'}
                            </span>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs">
                            <Icon name="Check" size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedPackage && !selectedPackage.free && !selectedPackage.custom && (
                <Card className="max-w-xl mx-auto mt-8 bg-green-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-200">💳 Оформление покупки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-950/50 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-400">Выбрано:</div>
                          <div className="font-bold text-green-300">{selectedPackage.emoji} {selectedPackage.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {duration === 'forever' ? selectedPackage.priceForever : (selectedPackage.priceMonth || selectedPackage.priceForever)}₽
                          </div>
                          <div className="text-xs text-gray-400">
                            {duration === 'forever' ? 'навсегда' : 'на месяц'}
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                        onClick={() => handlePurchase()}
                      >
                        <Icon name="CreditCard" className="mr-2" />
                        Перейти к оплате
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="tokens" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-green-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-200 flex items-center gap-2">
                    <span className="text-3xl">🎁</span>
                    Токен Кейсы
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Купи кейсы и получи ценные предметы на сервере! 1 кейс = 10₽
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-green-200">Количество кейсов (1-50)</Label>
                    <Input 
                      type="number"
                      min="1"
                      max="50"
                      value={tokenCount}
                      onChange={(e) => setTokenCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="bg-green-950/50 border-green-500/30 text-green-100 mt-2"
                    />
                  </div>
                  <div className="p-4 bg-green-950/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Итого:</span>
                      <span className="text-3xl font-bold text-green-400">{tokenCount * 10}₽</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                    onClick={() => handlePurchase(tokenCount * 10, `${tokenCount} токен кейс(ов)`)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" />
                    Купить {tokenCount} кейс(ов)
                  </Button>
                  
                  <div className="mt-6 pt-6 border-t border-green-500/30">
                    <CardTitle className="text-green-200 mb-4">💰 2000 Токенов</CardTitle>
                    <CardDescription className="text-gray-300 mb-4">
                      Купи 2000 игровых токенов всего за 1₽!
                    </CardDescription>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => handlePurchase(1, '2000 токенов')}
                    >
                      Купить 2000 токенов за 1₽
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="balance" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-green-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-200 flex items-center gap-2">
                    <span className="text-3xl">💵</span>
                    Биржа Баланс
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Пополни игровой баланс на сервере! От 5₽ до 10,000,000₽
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-green-200">Сумма пополнения (₽)</Label>
                    <Input 
                      type="number"
                      min="5"
                      max="10000000"
                      value={balanceAmount}
                      onChange={(e) => setBalanceAmount(Math.min(10000000, Math.max(5, parseInt(e.target.value) || 5)))}
                      className="bg-green-950/50 border-green-500/30 text-green-100 mt-2"
                    />
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {[5, 10, 50, 100, 500, 1000, 5000, 10000].map(amount => (
                        <Button
                          key={amount}
                          size="sm"
                          variant="outline"
                          onClick={() => setBalanceAmount(amount)}
                          className="border-green-500/30 text-green-300"
                        >
                          {amount}₽
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-green-950/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Вы получите:</span>
                      <span className="text-3xl font-bold text-green-400">{balanceAmount}₽ на счет</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                    onClick={() => handlePurchase(balanceAmount, `Баланс ${balanceAmount}₽`)}
                  >
                    <Icon name="Wallet" className="mr-2" />
                    Пополнить баланс
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-green-200 mb-2">⭐ Отзывы игроков ⭐</h2>
                  <p className="text-gray-300">Более 45 отзывов от наших игроков!</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reviews.map((review, idx) => (
                    <Card key={idx} className="bg-green-900/20 border-green-500/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm text-green-200">{review.emoji} {review.name}</CardTitle>
                          <div className="flex">
                            {Array.from({length: review.rating}).map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="max-w-4xl mx-auto space-y-8 mt-12">
            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-200">👥 Команда FreeTime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <div className="font-bold text-green-300 mb-2">🌟 Создатели сервера:</div>
                    <div className="ml-4">minercasoft, umQKokiq, Lololoshka</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-300 mb-2">💻 Кодеры (плагины):</div>
                    <div className="ml-4">minercasoft, umQKoKiq</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-300 mb-2">🌐 Кодер сайта:</div>
                    <div className="ml-4">Юра (AI-разработчик)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-200">📋 Правила сервера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300 text-sm max-h-96 overflow-y-auto">
                <div>
                  <h3 className="font-bold text-green-300 mb-2">1. Основные правила</h3>
                  <ul className="space-y-1 ml-4">
                    <li>1.1 Незнание правил не освобождает вас от ответственности</li>
                    <li>1.2 Начав играть на наших серверах, Вы автоматически подтверждаете своё согласие с данным сводом правил</li>
                    <li>1.3 Администратор вправе наказать игрока по причине, не указанной в настоящих правилах</li>
                    <li>1.8 Игроки обязаны соблюдать все правила</li>
                    <li>1.11 Оскорбление, провоцирование администрации запрещено</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-green-300 mb-2">2. Правила чата</h3>
                  <ul className="space-y-1 ml-4">
                    <li>2.1 Запрещен Капс/Спам/Флуд в любом из чатов</li>
                    <li>2.2 Запрещены унижения, оскорбления игроков</li>
                    <li>2.3 Запрещена нецензурная лексика (маты, скрытые маты)</li>
                    <li>2.4 Запрещено рекламировать/упоминать посторонние ресурсы</li>
                    <li>2.7 Запрещается розжиг межнациональной розни</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-green-300 mb-2">3. Аккаунт</h3>
                  <ul className="space-y-1 ml-4">
                    <li>3.1 Ник не должен содержать мата, оскорблений</li>
                    <li>3.2 Запрещается предоставлять свой аккаунт другим людям</li>
                    <li>3.3 Ответственность несет владелец аккаунта</li>
                    <li>3.5 Донат невозможно перенести на другой аккаунт</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-green-300 mb-2">4. Игровые правила</h3>
                  <ul className="space-y-1 ml-4">
                    <li>4.1 Запрещено мошенничество, обман администрации</li>
                    <li>4.3 Запрещено пользоваться читами, кликерами</li>
                    <li>4.4 Запрещено укрывать нарушителя</li>
                    <li>4.6 Запрещено вызывание неполадок в работе сервера</li>
                    <li>4.8 Запрещено использование/скрытие багов</li>
                    <li>4.10 Запрещено строительство половых органов, нацистских символик</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-green-300 mb-2">5. Правила проверки ПО</h3>
                  <ul className="space-y-1 ml-4">
                    <li>5.1 Вы обязаны выполнять требования Проверяющего</li>
                    <li>5.5 Запрещается препятствовать проведению проверки</li>
                    <li>5.6 Во время проверки запрещается удалять файлы</li>
                    <li>5.9 Проверяющий имеет право попросить установить Ocean, AnyDesk и другие программы</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-200">📡 Информация о сервере</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Icon name="Server" className="text-green-400" />
                  <span className="font-bold">IP:</span> FreeTime.gomc.me
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageSquare" className="text-indigo-400" />
                  <span className="font-bold">Discord:</span> <a href="https://discord.gg/WBrBCpUbkc" className="text-blue-300 hover:underline">discord.gg/WBrBCpUbkc</a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Send" className="text-blue-400" />
                  <span className="font-bold">Telegram:</span> <a href="https://t.me/FreeTimeOffical" className="text-blue-300 hover:underline">@FreeTimeOffical</a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Bot" className="text-purple-400" />
                  <span className="font-bold">Бот розыгрышей:</span> <a href="https://t.me/FreeTimeRazdathi_bot" className="text-blue-300 hover:underline">@FreeTimeRazdathi_bot</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border-t border-green-500/20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 FreeTime Minecraft Server. Все права защищены.</p>
          <p className="mt-2">Сайт разработан AI-ассистентом Юра | poehali.dev</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
