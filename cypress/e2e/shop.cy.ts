import { ProductResponse } from "../../src/shared/types";

describe("shop page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows initial items", () => {
    cy.intercept("GET", "**/products/**").as("products");

    cy.getByCyId("loading").should("have.text", "Fetching Products");

    cy.wait("@products").then((productsXhr) => {
      expect(productsXhr.response?.statusCode).equal(200);
      const productsResponse = productsXhr.response?.body as ProductResponse;
      const products = productsResponse.products;

      // check if all cards are rendered correctly
      cy.getByCyId("card").then((cards) => {
        cards.each((cardIndex) => {
          cy.wrap(cards[cardIndex]).within(() => {
            const { title, description, price, discountPercentage } =
              products[cardIndex];
            cy.getByCyId("card-title").should("have.text", title);
            cy.getByCyId("card-content").should("have.text", description);
            cy.getByCyId("card-price").should("have.text", `$${price}`);
            const discountedPrice = price * ((100 - discountPercentage) / 100);
            cy.getByCyId("card-discounted-price").should(
              "have.text",
              `$${discountedPrice.toFixed(2)}`
            );
            cy.getByCyId("card-item-count").should("have.text", "No Item");
          });
        });
      });

      // check if first pagination item is selected and thus disabled
      cy.getByCyId("pagination-0").should("be.disabled");
    });
  });

  it("search updates results", () => {
    cy.visit("/");
    cy.getByCyId("field-search").type("and");

    cy.intercept("GET", "**/products/**").as("products");

    cy.wait("@products").then((productsXhr) => {
      expect(productsXhr.response?.statusCode).equal(200);
      const productsResponse = productsXhr.response?.body as ProductResponse;
      const products = productsResponse.products;

      // check if all cards are rendered correctly
      cy.getByCyId("card").then((cards) => {
        cards.each((cardIndex) => {
          cy.wrap(cards[cardIndex]).within(() => {
            const { title, description, price, discountPercentage } =
              products[cardIndex];
            cy.getByCyId("card-title").should("have.text", title);
            cy.getByCyId("card-content").should("have.text", description);
            cy.getByCyId("card-price").should("have.text", `$${price}`);
            const discountedPrice = price * ((100 - discountPercentage) / 100);
            cy.getByCyId("card-discounted-price").should(
              "have.text",
              `$${discountedPrice.toFixed(2)}`
            );
            cy.getByCyId("card-item-count").should("have.text", "No Item");
          });
        });
      });

      // check if first pagination item is selected and thus disabled
      cy.getByCyId("pagination-0").should("be.disabled");
    });
  });

  it("adds items to basket", () => {
    cy.visit("/");

    cy.intercept("GET", "**/products/**").as("products");

    cy.wait("@products").then((productsXhr) => {
      expect(productsXhr.response?.statusCode).equal(200);
      const productsResponse = productsXhr.response?.body as ProductResponse;
      const products = productsResponse.products;
      const selectedItems = [
        { count: 3, index: 2 },
        { count: 2, index: 5 },
        { count: 1, index: 9 },
      ];
      const chosenProducts = selectedItems.map(
        (selectedItem) => products[selectedItem.index]
      );

      // check if all cards are rendered correctly
      cy.getByCyId("card").then((cards) => {
        selectedItems.map((selectedItem) => {
          cy.wrap(cards[selectedItem.index]).within(() => {
            for (let i = 0; i < selectedItem.count; i++) {
              cy.getByCyId("btn-add").click();
            }
          });
        });
      });

      cy.getByCyId("btn-open-basket").click();

      // check if all selected cards are added to basket
      cy.getByCyId("basket-card").then((basketCards) => {
        basketCards.each((cardIndex) => {
          cy.wrap(basketCards[cardIndex]).within(() => {
            const { title, price, discountPercentage } =
              chosenProducts[cardIndex];
            cy.getByCyId("basket-card-title").should("have.text", title);
            const discountedPrice = price * ((100 - discountPercentage) / 100);
            cy.getByCyId("basket-card-discounted-price").should(
              "have.text",
              `$${discountedPrice.toFixed(2)}`
            );
            cy.getByCyId("basket-card-item-count").should(
              "have.text",
              `${selectedItems[cardIndex].count} item`
            );
          });
        });
      });

      // check if first pagination item is selected and thus disabled
      cy.getByCyId("pagination-0").should("be.disabled");
    });
  });
});
