import styles from './stock-details.module.scss';

import TemplateView from '../../templates/view/view.template';

const stock = {
  name: 'Akcja XXXX',
  description:
    'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
  count: 200,
  minPrice: 123456,
  graph: [],
};

const ViewStockDetails: React.FC<{ appVersion: string; isLogged?: boolean }> = (
  props,
) => {
  const price = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(stock.minPrice / 100);

  const handleBuyButtonClick = () => {
    console.log('hey');
  };

  return (
    <TemplateView
      appVersion={props.appVersion}
      viewTitle="Szczegóły akcji X"
      isLogged={props.isLogged}
    >
      <div className={styles.backdrop}>
        <div className={styles.panel}>
          <div id="stock-name" className={styles.line}>
            <span className={styles.label}>Nazwa akcji:</span>
            <span className={styles.value}>{stock.name}</span>
          </div>
          <div id="stock-description" className={styles.line}>
            <span className={styles.label}>Opis:</span>
            <span className={styles.value}>{stock.description}</span>
          </div>
          <div id="stock-count" className={styles.line}>
            <span className={styles.label}>Liczba w obiegu:</span>
            <span className={styles.value}>{stock.count}</span>
          </div>
          <div id="stock-min-price" className={styles.line}>
            <span className={styles.label}>Aktualne oferty sprzedaży od:</span>
            <span className={styles.value}>{price}</span>
          </div>
          <div id="stock-buy-button" className={styles.lineButton}>
            <button
              id="stock-buy-button"
              className={styles.button}
              onClick={handleBuyButtonClick}
            >
              Kup
            </button>
          </div>
          <div id="stock-history">
            <span className={styles.label}>
              Historia zmian ceny jednostkowej:
            </span>
          </div>
        </div>
      </div>
    </TemplateView>
  );
};

export default ViewStockDetails;
