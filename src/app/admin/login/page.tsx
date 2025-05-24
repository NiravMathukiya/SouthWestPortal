import LoginForm from "@/components/authComponents/LoginForm";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.webp";

const LoginPage: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm z-10">
        <div className="container mx-auto">
          <Image
            src={logo}
            alt="Ismaili Council for the Southwestern USA"
            width={200}
            height={60}
            className="h-auto w-auto max-h-14"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Hero Image */}
        <div className="relative w-full md:w-3/5 h-40 md:h-auto overflow-hidden">
          <Image
            src="/hero-image.jpg"
            alt="Decorative background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-emerald-800/50 flex items-center justify-center p-6">
            <div className="text-white max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Welcome Back
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Access your portal to connect with the Ismaili Council for the
                Southwestern USA
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-6 md:p-10 bg-gray-50">
          <LoginForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-sm text-gray-600 border-t">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} Ismaili Council for the Southwestern
            USA. All Rights Reserved.
          </p>
          <p>Version 3.0</p>
        </div>
      </footer>
    </main>
  );
};

export default LoginPage;
