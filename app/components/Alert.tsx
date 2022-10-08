interface AlertProps {
  margin?: boolean;
  className?: string;
  message: string;
}

export default function Alert({
  message,
  className = "",
  margin = true,
}: AlertProps) {
  return (
    <div
      class={`${
        margin ? "m-4 mb-4" : ""
      } p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 ${className}`}
      role="alert"
    >
      <span class="font-medium">{message}</span>
    </div>
  );
}
