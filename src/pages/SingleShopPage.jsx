import { useParams } from 'react-router-dom';

export default function SingleShopPage() {
  const params = useParams();
  console.log('params ===', params);
  return <div>SingleShop</div>;
}
