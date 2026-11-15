import BackBreadcrumb from "../components/BackBreadcrumb.jsx";
import CartIconButtonForNav from "../components/CartIconButtonForNav.jsx";
import ErrorScreen from "../components/ErrorScreen";
import FoodCartWidget from "../components/FoodCartWidget";
import FoodPrice from "../components/FoodPrice";
import LayoutContainer from "../components/LayoutContainer";
import PageHeading from "../components/PageHeading.jsx";
import PageLayout from "../components/PageLayout.jsx";
import PageLoader from "../components/PageLoader";
import SumaImage from "../components/SumaImage";
import { dt, t } from "../localization";
import makeTitle from "../modules/makeTitle";
import { anyMoney, intToMoney } from "../shared/money";
import Money from "../shared/react/Money";
import useOffering from "../state/useOffering";
import find from "lodash/find";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

/**
 * Generic (non food-specific) product details page, in the v1 webapp style.
 * Uses the same offering/cart state as the food flow,
 * so adding to cart here shows up in the offering's cart.
 */
export default function ProductDetails() {
  const { offeringId } = useParams();
  const productId = parseInt(useParams().productId, 10);
  const { vendors, products, cart, initializeToOffering, error, loading } = useOffering();

  // Quantity the user picked in the widget, before the cart round-trip finishes.
  // null means "use whatever the cart says".
  const [pendingQuantity, setPendingQuantity] = React.useState(null);

  React.useEffect(() => {
    initializeToOffering(offeringId);
  }, [initializeToOffering, offeringId]);

  const backHref = `/food/${offeringId}`;

  if (loading) {
    return (
      <PageLayout {...PAGE_LAYOUT_PROPS}>
        <PageLoader buffered />
      </PageLayout>
    );
  }

  const product = find(products, (p) => p.productId === productId);
  if (error || !product) {
    const errorScreenProps = error
      ? {}
      : {
          body: t("products.unavailable"),
          actionLabel: t("common.back"),
          actionHref: backHref,
        };
    return (
      <PageLayout {...PAGE_LAYOUT_PROPS}>
        <LayoutContainer top>
          <ErrorScreen {...errorScreenProps} />
        </LayoutContainer>
      </PageLayout>
    );
  }

  const vendor = find(vendors, (v) => v.id === product.vendor.id) || product.vendor;
  const cartItem = find(cart.items, (i) => i.productId === productId);
  const quantity = pendingQuantity ?? cartItem?.quantity ?? 0;
  const subtotal = intToMoney(quantity * (product.customerPrice.cents || 0));

  return (
    <PageLayout
      {...PAGE_LAYOUT_PROPS}
      stickyNavAddon={<CartIconButtonForNav offeringId={offeringId} cart={cart} />}
    >
      <Helmet>
        <title>{makeTitle(product.name, vendor.name, t("products.title"))}</title>
      </Helmet>
      <LayoutContainer gutters>
        <BackBreadcrumb back={backHref} />
        <PageHeading level={1} className="mb-1">
          {dt(product.name)}
        </PageHeading>
        <p className="text-secondary mb-3">
          {t("products.sold_by", { vendorName: vendor.name })}
        </p>
      </LayoutContainer>
      <SumaImage
        image={product.images[0]}
        className="w-100"
        params={{ crop: "center" }}
        h={325}
        width={500}
        variant="dark"
      />
      <LayoutContainer gutters top>
        <Row className="align-items-start">
          <Col xs={6}>
            <FoodPrice {...product} vendorName={vendor.name} fs={4} className="gap-2" />
          </Col>
          <Col xs={6} className="text-end">
            <FoodCartWidget
              product={product}
              onQuantityChange={setPendingQuantity}
              size="lg"
            />
            {anyMoney(subtotal) && (
              <div className="me-4 mt-2">
                <div className="small text-secondary">{t("products.item_subtotal")}</div>
                <Money className="text-muted">{subtotal}</Money>
              </div>
            )}
          </Col>
        </Row>
      </LayoutContainer>
      <hr className="my-4" />
      <LayoutContainer gutters>
        <h2 className="h4">{t("products.description_header")}</h2>
        <div>{dt(product.description)}</div>
      </LayoutContainer>
    </PageLayout>
  );
}

const PAGE_LAYOUT_PROPS = { gutters: false, top: true };
