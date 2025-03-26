import React, { useState } from 'react';
import { MessageSquare, Settings, Search, User, MoreVertical, Send, Image, FileText, Video, X, ChevronLeft, Users, Plus, Camera, Upload } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
  media: Media[];
  isGroup?: boolean;
  members?: string[];
  avatar?: string;
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface Media {
  id: number;
  type: 'image' | 'file' | 'video';
  url: string;
  name: string;
  date: string;
}

function App() {
  const [activeSection, setActiveSection] = useState<'messages' | 'settings'>('messages');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupDescription, setGroupDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const chats: Chat[] = [
    {
      id: 1,
      name: "Équipe Marketing",
      lastMessage: "Réunion demain à 10h",
      time: "10:30",
      unread: 3,
      isGroup: true,
      members: ["Marie Laurent", "Thomas Bernard", "Sophie Martin", "Lucas Dubois"],
      messages: [
        { id: 1, text: "On fait le point sur la campagne?", sent: false, time: "10:15" },
        { id: 2, text: "Parfait pour moi", sent: true, time: "10:20" },
        { id: 3, text: "Réunion demain à 10h", sent: false, time: "10:30" },
      ],
      media: [
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', name: 'Meeting.jpg', date: '12/03/2024' },
        { id: 2, type: 'file', url: '#', name: 'Marketing_Plan.pdf', date: '10/03/2024' },
      ],
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: "Marie Laurent",
      lastMessage: "Bonjour! Comment ça va?",
      time: "10:30",
      unread: 2,
      messages: [
        { id: 1, text: "Salut! Tu as passé une bonne journée?", sent: false, time: "10:15" },
        { id: 2, text: "Oui, très bien! Et toi?", sent: true, time: "10:20" },
        { id: 3, text: "Bonjour! Comment ça va?", sent: false, time: "10:30" },
      ],
      media: [
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', name: 'Meeting.jpg', date: '12/03/2024' },
        { id: 2, type: 'file', url: '#', name: 'Presentation.pdf', date: '10/03/2024' },
        { id: 3, type: 'video', url: '#', name: 'Project-demo.mp4', date: '08/03/2024' },
      ]
    },
    {
      id: 3,
      name: "Projet Design",
      lastMessage: "Les maquettes sont prêtes",
      time: "09:15",
      unread: 0,
      isGroup: true,
      members: ["Sophie Martin", "Lucas Dubois", "Emma Petit"],
      messages: [
        { id: 1, text: "J'ai terminé les maquettes", sent: false, time: "09:10" },
        { id: 2, text: "Les maquettes sont prêtes", sent: false, time: "09:15" },
      ],
      media: [
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', name: 'Design_Mock.jpg', date: '12/03/2024' },
      ],
      avatar: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=800&auto=format&fit=crop'
    },
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const filteredMessages = selectedChatData?.messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedMembers.length > 0) {
      // Ici, vous ajouteriez la logique pour créer réellement le groupe
      setShowNewGroupModal(false);
      setNewGroupName('');
      setGroupDescription('');
      setSelectedMembers([]);
      setCurrentStep(1);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !newGroupName.trim()) return;
    if (currentStep === 2 && selectedMembers.length === 0) return;
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden group-hover:opacity-80 transition-opacity">
                  <Camera size={32} className="text-gray-500" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white p-2 rounded-full shadow-lg">
                    <Upload size={20} className="text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du groupe
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Entrez le nom du groupe"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optionnelle)
              </label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Décrivez le but du groupe"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 h-24 resize-none"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Ajouter des membres</h3>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des membres..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
              </div>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {['Marie Laurent', 'Thomas Bernard', 'Sophie Martin', 'Lucas Dubois', 'Emma Petit', 'Jules Roux'].map((member) => (
                <div key={member} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id={member}
                    checked={selectedMembers.includes(member)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, member]);
                      } else {
                        setSelectedMembers(selectedMembers.filter(m => m !== member));
                      }
                    }}
                    className="mr-3"
                  />
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <label htmlFor={member} className="flex-1 cursor-pointer">
                    <div className="font-medium">{member}</div>
                    <div className="text-sm text-gray-500">En ligne</div>
                  </label>
                </div>
              ))}
            </div>
            {selectedMembers.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  {selectedMembers.length} membre{selectedMembers.length > 1 ? 's' : ''} sélectionné{selectedMembers.length > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                <Users size={40} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold">{newGroupName}</h3>
              {groupDescription && (
                <p className="text-gray-600 mt-2">{groupDescription}</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Membres ({selectedMembers.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((member) => (
                  <div key={member} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {member}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-20 bg-white border-r flex flex-col items-center py-6">
        <button 
          onClick={() => setActiveSection('messages')}
          className={`p-3 rounded-xl mb-4 ${activeSection === 'messages' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <MessageSquare size={24} />
        </button>
        <button 
          onClick={() => setActiveSection('settings')}
          className={`p-3 rounded-xl ${activeSection === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Chat List */}
      <div className="w-80 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">
              {activeSection === 'messages' ? 'Messages' : 'Paramètres'}
            </h1>
            {activeSection === 'messages' && (
              <button 
                onClick={() => setShowNewGroupModal(true)}
                className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                title="Créer un groupe"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
          {activeSection === 'messages' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
          )}
        </div>

        {activeSection === 'messages' ? (
          <div className="overflow-y-auto h-[calc(100vh-140px)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                    ) : chat.isGroup ? (
                      <Users size={24} className="text-gray-600" />
                    ) : (
                      <User size={24} className="text-gray-600" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{chat.name}</h3>
                      <span className="text-sm text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <User size={20} className="text-gray-600" />
                  <span className="ml-3">Profile</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Settings size={20} className="text-gray-600" />
                  <span className="ml-3">Préférences</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Chat Section */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {selectedChatData.avatar ? (
                      <img src={selectedChatData.avatar} alt={selectedChatData.name} className="w-full h-full object-cover" />
                    ) : selectedChatData.isGroup ? (
                      <Users size={20} className="text-gray-600" />
                    ) : (
                      <User size={20} className="text-gray-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-medium">{selectedChatData.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedChatData.isGroup 
                        ? `${selectedChatData.members?.length} membres`
                        : 'En ligne'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {showProfile ? <ChevronLeft size={20} /> : <User size={20} />}
                </button>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* Messages */}
              <div className={`flex-1 flex flex-col ${showProfile ? 'hidden md:flex' : ''}`}>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(searchTerm ? filteredMessages : selectedChatData.messages).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sent
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sent ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Écrivez votre message..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Section */}
              {showProfile && (
                <div className="w-full md:w-80 bg-white border-l">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">
                        {selectedChatData.isGroup ? 'Groupe' : 'Profil'}
                      </h2>
                      <button 
                        onClick={() => setShowProfile(false)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden mb-4">
                        {selectedChatData.avatar ? (
                          <img src={selectedChatData.avatar} alt={selectedChatData.name} className="w-full h-full object-cover" />
                        ) : selectedChatData.isGroup ? (
                          <Users size={40} className="text-gray-600" />
                        ) : (
                          <User size={40} className="text-gray-600" />
                        )}
                      </div>
                      <h3 className="text-xl font-medium">{selectedChatData.name}</h3>
                      <p className="text-gray-500">
                        {selectedChatData.isGroup 
                          ? `${selectedChatData.members?.length} membres`
                          : 'En ligne'}
                      </p>
                    </div>
                  </div>

                  {selectedChatData.isGroup && (
                    <div className="p-4 border-b">
                      <h3 className="font-medium mb-3">Membres du groupe</h3>
                      <div className="space-y-3">
                        {selectedChatData.members?.map((member, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <User size={16} className="text-gray-600" />
                            </div>
                            <span className="ml-3 text-sm">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 border-b">
                    <h3 className="font-medium mb-2">Rechercher dans la discussion</h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher des messages..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-4">Fichiers partagés</h3>
                    <div className="space-y-4">
                      {selectedChatData.media.map((item) => (
                        <div key={item.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                          {item.type === 'image' && <Image size={20} className="text-blue-500" />}
                          {item.type === 'file' && <FileText size={20} className="text-green-500" />}
                          {item.type === 'video' && <Video size={20} className="text-red-500" />}
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                      {selectedChatData.media.length === 0 && (
                        <p className="text-gray-500 text-sm">Aucun fichier partagé</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>

      {/* Modal de création de groupe */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {currentStep === 1 && "Créer un nouveau groupe"}
                  {currentStep === 2 && "Ajouter des membres"}
                  {currentStep === 3 && "Aperçu du groupe"}
                </h2>
                <button
                  onClick={() => setShowNewGroupModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {renderModalContent()}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Retour
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={
                      (currentStep === 1 && !newGroupName.trim()) ||
                      (currentStep === 2 && selectedMembers.length === 0)
                    }
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    onClick={handleCreateGroup}
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Créer le groupe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;