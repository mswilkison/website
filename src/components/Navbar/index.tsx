import { FC } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Container, HStack, useDisclosure } from "@chakra-ui/react"
import ThresholdBrand from "./ThresholdBrand"
import SocialMediaLinks from "./SocialMediaLinks"
import HamburgerButton from "./HamburgerButton"
import { LinkInfo } from "./types"
import WhatsNextBanner from "./WhatsNextBanner"
import MobileDrawer from "./MobileNav/MobileDrawer"
import DesktopNavLinks from "./DesktopNav/DesktopNavLinks"

const query = graphql`
  query Navbar {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "nav-bar" } } }
    ) {
      edges {
        node {
          frontmatter {
            nav_items {
              label
              url
              isExternal
              subitems {
                url
                label
                isExternal
              }
            }
            social_links {
              label
              url
              icon {
                image {
                  id
                  absolutePath
                  internal {
                    mediaType
                  }
                  svg {
                    name
                    attributes {
                      key
                      value
                    }
                    children {
                      name
                      type
                      value
                      attributes {
                        key
                        value
                      }
                    }
                  }
                }
                alt
              }
            }
          }
        }
      }
    }
  }
`

export const Navbar: FC = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawOpen,
    onClose: onDrawerClose,
  } = useDisclosure()

  const { isOpen: showBanner, onClose: closeBanner } = useDisclosure({
    defaultIsOpen: true,
  })
  const data = useStaticQuery(query)
  const socialLinks =
    data.allMarkdownRemark.edges[0].node.frontmatter.social_links
  const navLinks = data.allMarkdownRemark.edges[0].node.frontmatter
    .nav_items as LinkInfo[]

  return (
    <>
      {showBanner && <WhatsNextBanner onClose={closeBanner} />}
      <HStack
        bg="gray.900"
        h="90px"
        borderBottom="1px solid"
        borderColor="gray.700"
        as="header"
      >
        {/* TODO: NEED MAX WITH FROM DESIGN TEAM */}
        <Container maxW="1440px" h="100%" display="flex">
          <ThresholdBrand />
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
            navLinks={navLinks}
          />
          <DesktopNavLinks navLinks={navLinks} />
          <SocialMediaLinks links={socialLinks} />
          <HamburgerButton openDrawer={onDrawOpen} />
        </Container>
      </HStack>
    </>
  )
}
