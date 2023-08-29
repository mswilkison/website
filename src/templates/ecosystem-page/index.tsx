import { FC } from "react"
import { graphql } from "gatsby"
import SectionTemplate from "../home-page/SectionTemplate"
import { Box } from "@chakra-ui/react"
import { IntegrationsCardGroup } from "../../components/IntegrationCard"

const EcosystemPageTemplate: FC = ({ data }: any) => {
  const { ecosystemInfo, integrations } = data.markdownRemark.frontmatter

  return (
    <Box>
      <SectionTemplate
        {...ecosystemInfo}
        image={{ ...ecosystemInfo.image, mr: "28rem", mt: "-3rem", w: "52rem" }}
        preTitle={null}
        columnReverse
        bgColor="gray.900"
        isSmallSize
        isImageBackground
      />
      <IntegrationsCardGroup cards={integrations} />
    </Box>
  )
}

export default EcosystemPageTemplate

export const query = graphql`
  query EcosystemPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        ecosystemInfo {
          rowReverse
          title
          highlightedWord
          description
          image {
            id
            relativePath
            internal {
              mediaType
            }
            childImageSharp {
              gatsbyImageData(width: 200)
            }
          }
        }
        integrations {
          image {
            id
            relativePath
            internal {
              mediaType
            }
            childImageSharp {
              gatsbyImageData(width: 200)
            }
          }
          title
        }
      }
    }
  }
`
