import {Peer} from './types/peer';
import {Mission} from './types/mission';
import {Circle} from './types/circle';
import {Role} from './types/role';
import {Holder} from './types/holder';
import {Node} from './types/node';
import {Tenant} from './types/tenant';
import {NewPeerPatch} from './types/new-peer-patch';

import {scalars} from './scalars';

export const types = [scalars, Circle, Holder, Mission, Node, Peer, Role, Tenant, NewPeerPatch];
