import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icons
const AlertTriangleIcon = getIcon('AlertTriangle');
const HomeIcon = getIcon('Home');

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6">
        <AlertTriangleIcon className="h-12 w-12 text-amber-500" />
      </div>
      
      <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/" 
        className="btn btn-primary flex items-center gap-2"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>
      
      <motion.div 
        className="mt-16 w-full max-w-md p-6 card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-3 text-surface-800 dark:text-white">
          Quick Navigation
        </h2>
        <ul className="space-y-2 text-left">
          <li>
            <Link to="/" className="text-primary hover:underline block p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <span className="text-surface-500 block p-2 cursor-not-allowed">
              Equipment Catalog
            </span>
          </li>
          <li>
            <span className="text-surface-500 block p-2 cursor-not-allowed">
              Maintenance Schedule
            </span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;