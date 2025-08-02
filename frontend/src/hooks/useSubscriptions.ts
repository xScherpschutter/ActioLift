import { useState, useEffect } from 'preact/hooks';
import { Subscription, SubscriptionForm } from '../types';
import toast from 'react-hot-toast';
import { GetAllSubscriptions, SaveSubscription, DeleteSubscription, UpdateSubscription } from '../../wailsjs/go/main/App'

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetAllSubscriptions()
      console.log(data);
      setSubscriptions(data);
    } catch (err) {
      setError(err as string);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (subscriptionData: SubscriptionForm): Promise<boolean> => {
    try {
      await SaveSubscription(subscriptionData)
      toast.success('Suscripción creada exitosamente');
      return true;
    } catch (err) {
      setError(err as string);
      toast.error(err);
      return false;
    }
  };

  const update = async (id: number, subscriptionData: Partial<Subscription>): Promise<boolean> => {
    try {
      await UpdateSubscription({
        id: id,
        client_id: subscriptionData.client_id!,
        membership_id: subscriptionData.membership_id!,
        start_date: subscriptionData.start_date!,
        end_date: subscriptionData.end_date!
      })
      toast.success('Suscripción actualizada exitosamente');
      return true;
    } catch (err) {
      setError(err as string);
      toast.error(err);
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    try {
      await DeleteSubscription({id: id})
      toast.success('Suscripción eliminada exitosamente');
      return true;
    } catch (err) {
      setError(err as string);
      toast.error(err);
      return false;
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    subscriptions,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
  };
}