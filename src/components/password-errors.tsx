export default function PasswordErrors({ message }: { message?: string }) {
  if (!message) return null;

  const items = message.split("|").map((m) => m.trim());
  return (
    <div>
      <p className="text-sm text-red-500">Problems:</p>
      <ul className="text-sm text-red-500 mt-1 list-disc list-inside space-y-1">
        {items.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
