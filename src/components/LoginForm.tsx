
import React, { useState } from 'react';
import Owl from './Owl';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentField, setCurrentField] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally handle actual login logic
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-4 login-form-container">
      <div className="mb-8 mt-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue</p>
      </div>
      
      <Owl 
        currentField={currentField}
        emailValue={email}
        passwordValue={password}
        showPassword={showPassword}
      />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setCurrentField('email')}
              onBlur={() => setCurrentField('')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus-effect"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setCurrentField('password')}
                onBlur={() => setCurrentField('')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg input-focus-effect"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-700">
              Remember me
            </label>
          </div>
          <a href="#" className="text-primary hover:underline transition-colors duration-200">
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
        >
          Sign In
        </Button>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:underline font-medium transition-colors duration-200">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
