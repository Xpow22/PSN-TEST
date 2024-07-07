import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { getCurrentDate } from '@/utils/dateUtils';
import { AuthContext } from '@/context/AuthContext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [greeting, setGreeting] = useState('');
  const menu = useRef<Menu>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUsername(userData.username);
    }
  }, []);

  const getTimezone = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Selamat Pagi');
    } else if (currentHour >= 12 && currentHour < 15) {
      setGreeting('Selamat Siang');
    } else if (currentHour >= 15 && currentHour < 18) {
      setGreeting('Selamat Sore');
    } else {
      setGreeting('Selamat Malam');
    }
  };

  useEffect(() => {
    getTimezone();
  }, []);

  const toggleDropdown = (event: React.MouseEvent) => {
    menu.current?.toggle(event);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const items = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-4 flex justify-end items-end"> 
      <div className="relative">
        <Button
          className="flex items-center border-none space-x-2 bg-transparent"
          onClick={toggleDropdown}
        >
          <div className="flex flex-col items-center space-x-2">
            <h4 className="text-xl">{`${greeting}, ${username}`}</h4>
            <p className="text-base">{getCurrentDate()}</p>
          </div>
          <i className="pi pi-chevron-down"></i>
        </Button>
        <Menu model={items} popup ref={menu} />
      </div>
    </div>
  );
};

export default Navbar;
