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