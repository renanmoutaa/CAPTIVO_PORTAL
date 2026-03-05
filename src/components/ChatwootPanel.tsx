import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Mail,
  CheckCheck,
  Check,
  Clock,
  X,
  User,
  Filter,
  MoreVertical,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastMessage: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "replied";
  unread: number;
  channel: "whatsapp" | "email";
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  status: "sent" | "delivered" | "read";
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "+55 11 98765-4321",
    email: "joao@email.com",
    lastMessage: "Obrigado pelo cupom! Vou usar agora 😊",
    timestamp: "2 min",
    status: "replied",
    unread: 2,
    channel: "whatsapp"
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "+55 11 97654-3210",
    email: "maria@email.com",
    lastMessage: "Olá Maria! 👋 Obrigado por se conectar...",
    timestamp: "5 min",
    status: "read",
    unread: 0,
    channel: "whatsapp"
  },
  {
    id: "3",
    name: "Pedro Costa",
    phone: "+55 11 96543-2109",
    email: "pedro@email.com",
    lastMessage: "Olá Pedro! 👋 Obrigado por se conectar...",
    timestamp: "8 min",
    status: "delivered",
    unread: 0,
    channel: "whatsapp"
  },
  {
    id: "4",
    name: "Ana Lima",
    phone: "+55 11 95432-1098",
    email: "ana@email.com",
    lastMessage: "Parabéns pela promoção! 🎉",
    timestamp: "12 min",
    status: "replied",
    unread: 1,
    channel: "whatsapp"
  },
  {
    id: "5",
    name: "Carlos Rocha",
    phone: "+55 11 94321-0987",
    email: "carlos@email.com",
    lastMessage: "Bem-vindo! Aqui está seu cupom de 15% OFF",
    timestamp: "15 min",
    status: "read",
    unread: 0,
    channel: "email"
  },
  {
    id: "6",
    name: "Lucia Ferreira",
    phone: "+55 11 93210-9876",
    email: "lucia@email.com",
    lastMessage: "Olá Lucia! 👋 Obrigado por se conectar...",
    timestamp: "20 min",
    status: "sent",
    unread: 0,
    channel: "whatsapp"
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Olá João! 👋\n\nObrigado por se conectar ao nosso WiFi!\n\n🎁 Aproveite 15% OFF na sua primeira compra usando o cupom: WIFI15\n\nVisite nossa loja: https://minhaloja.com",
    timestamp: "10:30",
    sent: true,
    status: "read"
  },
  {
    id: "2",
    text: "Obrigado pelo cupom! Vou usar agora 😊",
    timestamp: "10:32",
    sent: false,
    status: "delivered"
  },
  {
    id: "3",
    text: "Que ótimo! Se precisar de ajuda, estou aqui! 🙌",
    timestamp: "10:33",
    sent: true,
    status: "read"
  }
];

export function ChatwootPanel() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-slate-400" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-slate-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      sent: { label: "Enviado", className: "bg-slate-100 text-slate-700" },
      delivered: { label: "Entregue", className: "bg-blue-100 text-blue-700" },
      read: { label: "Lido", className: "bg-green-100 text-green-700" },
      replied: { label: "Respondeu", className: "bg-purple-100 text-purple-700" }
    };
    const badge = badges[status as keyof typeof badges];
    return <Badge variant="secondary" className={badge.className}>{badge.label}</Badge>;
  };

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Contacts List */}
      <Card className="border-slate-200 lg:col-span-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-slate-900 text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-600" />
              Conversas ({filteredContacts.length})
            </span>
            <Button size="icon" variant="ghost" className="h-7 w-7">
              <Filter className="h-4 w-4" />
            </Button>
          </CardTitle>
          <div className="space-y-2 mt-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar contatos..." 
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas conversas</SelectItem>
                <SelectItem value="replied">Respondidas</SelectItem>
                <SelectItem value="read">Lidas</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
                <SelectItem value="sent">Enviadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-4 pt-0">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? "bg-purple-50 border border-purple-200"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-900 truncate">
                          {contact.name}
                        </div>
                        <div className="text-xs text-slate-500 flex-shrink-0 ml-2">
                          {contact.timestamp}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <div className="text-xs text-slate-600 truncate">
                          {contact.phone}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs text-slate-500 truncate flex-1">
                          {contact.lastMessage}
                        </div>
                        {contact.unread > 0 && (
                          <Badge className="bg-purple-600 h-5 min-w-5 flex items-center justify-center px-1.5">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(contact.status)}
                        <Badge variant="secondary" className={
                          contact.channel === "whatsapp" 
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }>
                          {contact.channel === "whatsapp" ? "WhatsApp" : "Email"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="border-slate-200 lg:col-span-2 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <CardHeader className="flex-shrink-0 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {selectedContact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-slate-900">{selectedContact.name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="h-3 w-3" />
                      {selectedContact.phone}
                      <span className="mx-1">•</span>
                      <Mail className="h-3 w-3" />
                      {selectedContact.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                      <DropdownMenuItem>Histórico de conexões</DropdownMenuItem>
                      <DropdownMenuItem>Adicionar nota</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Bloquear contato</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                          message.sent
                            ? "bg-purple-600 text-white"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap break-words">
                          {message.text}
                        </div>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                            message.sent ? "text-purple-200" : "text-slate-500"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.sent && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="flex-shrink-0 border-t border-slate-200 p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  className="min-h-[60px] resize-none"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      // Send message logic
                      setMessageText("");
                    }
                  }}
                />
                <Button 
                  className="gap-2 bg-purple-600 hover:bg-purple-700 h-[60px]"
                  onClick={() => setMessageText("")}
                >
                  <Send className="h-4 w-4" />
                  Enviar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-slate-400" />
              </div>
              <div className="text-slate-900">Selecione uma conversa</div>
              <div className="text-sm text-slate-500">
                Escolha um contato para ver as mensagens
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
