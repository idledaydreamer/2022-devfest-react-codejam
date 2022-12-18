import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import React from 'react';
import Footer from 'src/components/common/Footer';
import ProductItem from 'src/components/common/ProductItem';
import { MainPageAppBarLeft } from 'src/components/common/Stackflow';
import { ProductInterface } from 'src/schemas/Product';
import { getProductList } from 'src/services/product';
import { useFlow } from 'src/utils/stackflow';

const MainPage: ActivityComponentType = () => {
  const { push } = useFlow();
  const [products, setProducts] = React.useState<ProductInterface[]>();

  const goToDetailPage = (id: number) => {
    push('DetailPage', { id: id.toString() });
  };

  const loopProducts = async () => {
    const { data } = await getProductList();
    setProducts(data);
    console.log(products);
  };



  React.useEffect(() => {
    loopProducts();
  }, []);

  return (
    <AppScreen appBar={{ appendLeft: MainPageAppBarLeft }}>
      {products &&
        products.map((product) => (
          <ProductItem key={product.id} item={product} onClickItem={() => goToDetailPage(product.id)} />
        ))}
      <Footer />
    </AppScreen>
  );
};

export default MainPage;