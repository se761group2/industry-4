import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../../src/types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type Machine = {
  __typename?: 'Machine';
  id: Scalars['ID'];
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
  sensors: Array<Sensor>;
};

export type MachineUpdatedResponse = MutationResponse & {
  __typename?: 'MachineUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MachineUpdateInput = {
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
  sensors: Array<Sensor>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser?: Maybe<MutationResponse>;
  updateMachine?: Maybe<MutationResponse>;
  updateSensor?: Maybe<MutationResponse>;
  createMachine?: Maybe<MutationResponse>;
  createSensor?: Maybe<MutationResponse>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMachineArgs = {
  id: Scalars['ID'];
  input?: Maybe<MachineUpdateInput>;
};


export type MutationUpdateSensorArgs = {
  id: Scalars['ID'];
  machineID: Scalars['ID'];
  input?: Maybe<SensorUpdateInput>;
};


export type MutationCreateMachineArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationCreateSensorArgs = {
  id: Scalars['ID'];
  input?: Maybe<SensorInput>;
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  machines: Array<Machine>;
  machine?: Maybe<Machine>;
  sensor?: Maybe<Sensor>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryMachineArgs = {
  id: Scalars['ID'];
};


export type QuerySensorArgs = {
  machineId: Scalars['ID'];
  id: Scalars['ID'];
};

export type SampleChunk = {
  __typename?: 'SampleChunk';
  timestamp: Scalars['Date'];
  timeStepSecs: Scalars['Float'];
  samples: Array<Maybe<Scalars['Float']>>;
};

export type Sensor = {
  __typename?: 'Sensor';
  id: Scalars['ID'];
  machineId: Scalars['ID'];
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
  signals: Array<Signal>;
};

export type SensorInput = {
  machineID: Scalars['ID'];
  name: Scalars['String'];
  signals: Array<Signal>;
};

export type SensorUpdateInput = {
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
};

export type Signal = {
  __typename?: 'Signal';
  id: Scalars['ID'];
  unit: Unit;
  threshold?: Maybe<Scalars['Float']>;
  machineId: Scalars['ID'];
  sensorId: Scalars['ID'];
  values?: Maybe<Array<Maybe<SampleChunk>>>;
};

export enum Status {
  Nominal = 'Nominal',
  Moderate = 'Moderate',
  Critical = 'Critical'
}

export enum Unit {
  Mps2 = 'MPS2',
  Mps2Rms = 'MPS2_RMS'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type UserUpdatedResponse = MutationResponse & {
  __typename?: 'UserUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Machine: ResolverTypeWrapper<Machine>;
  Status: Status;
  Sensor: ResolverTypeWrapper<Sensor>;
  Signal: ResolverTypeWrapper<Signal>;
  Unit: Unit;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  SampleChunk: ResolverTypeWrapper<SampleChunk>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['UserUpdatedResponse'] | ResolversTypes['MachineUpdatedResponse'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MachineUpdateInput: MachineUpdateInput;
  SensorUpdateInput: SensorUpdateInput;
  SensorInput: SensorInput;
  UserUpdatedResponse: ResolverTypeWrapper<UserUpdatedResponse>;
  MachineUpdatedResponse: ResolverTypeWrapper<MachineUpdatedResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  User: User;
  String: Scalars['String'];
  Machine: Machine;
  Sensor: Sensor;
  Signal: Signal;
  Float: Scalars['Float'];
  SampleChunk: SampleChunk;
  Date: Scalars['Date'];
  Mutation: {};
  MutationResponse: ResolversParentTypes['UserUpdatedResponse'] | ResolversParentTypes['MachineUpdatedResponse'];
  Boolean: Scalars['Boolean'];
  MachineUpdateInput: MachineUpdateInput;
  SensorUpdateInput: SensorUpdateInput;
  SensorInput: SensorInput;
  UserUpdatedResponse: UserUpdatedResponse;
  MachineUpdatedResponse: MachineUpdatedResponse;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MachineResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  sensors?: Resolver<Array<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MachineUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineUpdatedResponse'] = ResolversParentTypes['MachineUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  updateMachine?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMachineArgs, 'id'>>;
  updateSensor?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateSensorArgs, 'id' | 'machineID'>>;
  createMachine?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateMachineArgs, 'id' | 'name'>>;
  createSensor?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateSensorArgs, 'id'>>;
}>;

export type MutationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UserUpdatedResponse' | 'MachineUpdatedResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  machines?: Resolver<Array<ResolversTypes['Machine']>, ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType, RequireFields<QueryMachineArgs, 'id'>>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType, RequireFields<QuerySensorArgs, 'machineId' | 'id'>>;
}>;

export type SampleChunkResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SampleChunk'] = ResolversParentTypes['SampleChunk']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  timeStepSecs?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  samples?: Resolver<Array<Maybe<ResolversTypes['Float']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SensorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Sensor'] = ResolversParentTypes['Sensor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  signals?: Resolver<Array<ResolversTypes['Signal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignalResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Signal'] = ResolversParentTypes['Signal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>;
  threshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sensorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['SampleChunk']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserUpdatedResponse'] = ResolversParentTypes['UserUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  Machine?: MachineResolvers<ContextType>;
  MachineUpdatedResponse?: MachineUpdatedResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers;
  Query?: QueryResolvers<ContextType>;
  SampleChunk?: SampleChunkResolvers<ContextType>;
  Sensor?: SensorResolvers<ContextType>;
  Signal?: SignalResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserUpdatedResponse?: UserUpdatedResponseResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>;
