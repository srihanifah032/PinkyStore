import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi untuk merge className Tailwind (sudah ada)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Fungsi untuk format harga ke Rupiah
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

// Fungsi untuk format tanggal ke format Indonesia
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Fungsi untuk format tanggal singkat
export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Fungsi untuk validasi email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fungsi untuk generate random ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Fungsi untuk truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Fungsi untuk capitalize first letter
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Fungsi untuk delay/sleep
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};