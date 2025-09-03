import { motion } from "framer-motion";

export default function Popup({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white/90 text-gray-900 px-10 py-6 rounded-2xl shadow-2xl text-center max-w-sm w-full"
      >
        <p className="text-lg font-semibold">{message}</p>
      </motion.div>
    </motion.div>
  );
}
