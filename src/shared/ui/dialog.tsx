import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import CloseIcon from '@assets/icons/close.svg';

import { cn } from '@libs/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  title,
  hasCloseButton,
  children,
  onClose,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hasCloseButton?: boolean; onClose?: () => void }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props}>
    <div className="flex items-center justify-between">
      {title && <DialogTitle>{title}</DialogTitle>}
      {hasCloseButton ? <DialogCloseButton onClose={onClose} /> : null}
    </div>
    {children}
  </div>
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

function DialogButton(props: {
  render: React.VFC<{ onOpen: () => void }>;
  children: React.VFC<{ onClose: () => void; onKeyDown: React.KeyboardEventHandler }>;
  className?: string;
}) {
  // prop destruction
  const { render, children, className } = props;
  // lib hooks
  // state, ref, querystring hooks
  const [open, setOpen] = React.useState(false);
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleKeyDown = React.useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      // NOTE: Menu를 통해 Dialog을 열었을 경우, Tab키에 의한 다이얼로그 닫힘 현상을 막기 위함.
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.stopPropagation();
        }
      }}
      className={className}
    >
      {render({ onOpen: handleOpen })}
      {open && children({ onClose: handleClose, onKeyDown: handleKeyDown })}
    </div>
  );
}

function DialogCloseButton(props: { className?: string; onClose?: () => void }) {
  // prop destruction
  const { className, onClose } = props;
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <div
      className={`h-4 w-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ${className}`}
      onClick={onClose}
    >
      <CloseIcon />
      <span className="sr-only">Close</span>
    </div>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogButton,
  DialogCloseButton,
};
