import { EmptyState } from 'src/feedback/EmptyState';
import { useNavigate } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import styles from './error.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorPage}>
      <EmptyState
        icon={
          <MapPinOff
            size={42}
            strokeWidth={1.5}
            style={{ color: 'var(--mantine-color-yellow-6)' }}
          />
        }
        title="404 - Page Not Found"
        description="We couldn't find the page you're looking for. It might have been moved, deleted, or never existed."
        actionLabel="Back to Home"
        onAction={() => navigate('/')}
        secondaryActionLabel="Go back"
        onSecondaryAction={() => navigate(-1)}
      />
    </div>
  );
};

export default NotFoundPage;
