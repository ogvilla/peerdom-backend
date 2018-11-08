import {
  Peer,
  CreatePeerInput,
  CreatePeerPayload,
  DeletePeerInput,
  DeletePeerPayload,
  UpdatePeerInput,
  UpdatePeerPayload,
  PeerInput
} from './types/peer';
import {Map} from './types/map';
import {Mission} from './types/mission';
import {Circle} from './types/circle';
import {Role} from './types/role';
import {Holder} from './types/holder';
import {Node} from './types/node';
import {Tenant} from './types/tenant';

import {scalars} from './scalars';

export const types = [
  scalars,
  Circle,
  Holder,
  Map,
  Mission,
  Node,
  Peer,
  Role,
  Tenant,
  CreatePeerInput,
  CreatePeerPayload,
  DeletePeerInput,
  DeletePeerPayload,
  UpdatePeerInput,
  UpdatePeerPayload,
  PeerInput
];
