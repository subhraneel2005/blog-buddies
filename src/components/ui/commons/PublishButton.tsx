'use client';
 
import { useFormStatus } from 'react-dom'
import { Button } from '../button';
 
export function SubmitButton({onClick}: {onClick: () => void}) {
  const { pending } = useFormStatus();
 
  return (
    <Button disabled={pending}>
        {pending ? "Publishing..." : "Publish"} 
    </Button>
  )
}