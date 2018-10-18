import {gql} from 'apollo-server-express';

export const Tenant = gql`
  type MapSettings {
    coreRoleFallbackId: String
    coreRoleFallbackExceptions: [String]
  }

  type MissionSettings {
    enabled: Boolean
  }

  type MatomoSettings {
    url: String
    siteId: Int
  }

  type Tenant {
    id: ID!
    mapSettings: MapSettings
    missionSettings: MissionSettings
    matomoSettings: MatomoSettings
  }
`;
