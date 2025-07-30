// import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User, Mail } from 'lucide-react';

export default function UserProfile() {
    const { user, isAuthenticated, logout } = useAuthStore();

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleLogout = () => {
        logout();
    };



    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user.avatar || undefined}
                            alt={user.name}
                        />
                        <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                            {user.name}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                    {/* User Info Header */}
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={user.avatar || undefined}
                                alt={user.name}
                            />
                            <AvatarFallback className="bg-blue-500 text-white text-lg font-medium">
                                {user?.name}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span>User ID: {user.id}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200" />

                    {/* Actions */}
                    <div className="space-y-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
} 