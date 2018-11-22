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
import {Holder} from './types/holder';
import {
  Node,
  CreateNodeInput,
  CreateNodePayload,
  DeleteNodeInput,
  DeleteNodePayload,
  UpdateNodeInput,
  UpdateNodePayload,
  NodeNew,
  NodePatch
} from './types/node';
import {Tenant} from './types/tenant';

import {scalars} from './scalars';

export const types = [
  scalars,
  Holder,
  Map,
  Mission,
  Node,
  CreateNodeInput,
  CreateNodePayload,
  DeleteNodeInput,
  DeleteNodePayload,
  UpdateNodeInput,
  UpdateNodePayload,
  NodeNew,
  NodePatch,
  Peer,
  Tenant,
  CreatePeerInput,
  CreatePeerPayload,
  DeletePeerInput,
  DeletePeerPayload,
  UpdatePeerInput,
  UpdatePeerPayload,
  PeerInput
];
