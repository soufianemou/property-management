import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="40" mx={'auto'} />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProductCardSkeleton;
