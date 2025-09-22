import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6 flex justify-center"
        >
          <BookOpen className="w-16 h-16 text-blue-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          英検3級カードバトル
        </h1>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-lg">単語データを読み込み中...</span>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 h-2 bg-blue-200 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;

