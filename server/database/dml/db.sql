-- Get id of user shop
SELECT shop_id as "shop id"
FROM public.shop as "shop", public.user as "user"
WHERE shop.shop_owner =  72 -- `user_id`
GROUP BY shop_id
ORDER BY "shop id"

-- Get Products of shop by shop id
SELECT product_id, title, product_description, category, price, product_count,  posted_by_shop, is_blocked, product_image as "product"
FROM public.product as "products"
WHERE products.posted_by_shop = 1 -- `shop id`

-- Get Product by Product id
SELECT product_id, title, product_description, product_image, category, price, product_count, posted_by_user, posted_by_shop, is_blocked
FROM public.product
where product_id = 55;

-- Get Latest upload Products
SELECT *
FROM public.product
ORDER BY "created_at" DESC;

-- Get Latest upload Products only 3 for main page
SELECT *
FROM public.product
ORDER BY "created_at" DESC
LIMIT 3;

-- Get Lowest Price Product only 3 for main page
SELECT *
FROM public.product
ORDER BY "price" ASC
LIMIT 3; 