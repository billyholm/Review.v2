"use client";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function PhoneInput({ value, onChange, placeholder = "+46 70 123 45 67", required }: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters except +
    const cleaned = input.replace(/[^\d+]/g, "");
    
    // If it starts with +, keep it
    if (cleaned.startsWith("+")) {
      const countryCode = cleaned.substring(0, 3); // +46
      const rest = cleaned.substring(3).replace(/\D/g, "");
      
      if (rest.length <= 2) return countryCode + rest;
      if (rest.length <= 4) return `${countryCode} ${rest.substring(0, 2)} ${rest.substring(2)}`;
      if (rest.length <= 6) return `${countryCode} ${rest.substring(0, 2)} ${rest.substring(2, 4)} ${rest.substring(4)}`;
      return `${countryCode} ${rest.substring(0, 2)} ${rest.substring(2, 5)} ${rest.substring(5, 7)} ${rest.substring(7, 9)}`;
    }
    
    // If it doesn't start with +, add +46 for Swedish numbers
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return `+46 ${cleaned}`;
    if (cleaned.length <= 4) return `+46 ${cleaned.substring(0, 2)} ${cleaned.substring(2)}`;
    if (cleaned.length <= 6) return `+46 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4)}`;
    return `+46 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7, 9)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
      required={required}
    />
  );
}

