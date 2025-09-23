import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export function ErrorMessage({ message, onRetry, fullPage = false }: ErrorMessageProps) {
  const content = (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col space-y-2">
        <span>{message}</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="self-start"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
}