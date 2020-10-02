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
  image?: Maybe<Scalars['String']>;
  sensors: Array<Sensor>;
};

export type MachineCreationResponse = MutationResponse & {
  __typename?: 'MachineCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  machine?: Maybe<Machine>;
};

export type MachineSubscriptionResponse = MutationResponse & {
  __typename?: 'MachineSubscriptionResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type MachineUpdatedResponse = MutationResponse & {
  __typename?: 'MachineUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  machine?: Maybe<Machine>;
};

export type MachineUpdateInput = {
  name?: Maybe<Scalars['String']>;
  healthStatus?: Maybe<Status>;
  image?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser?: Maybe<MutationResponse>;
  updateMachine?: Maybe<MachineUpdatedResponse>;
  updateSensor?: Maybe<SensorUpdatedResponse>;
  createMachine?: Maybe<MachineCreationResponse>;
  createSensor?: Maybe<SensorCreationResponse>;
  createUser?: Maybe<UserCreationResponse>;
  subscribeToMachine?: Maybe<MachineSubscriptionResponse>;
  unsubscribeFromMachine?: Maybe<MachineSubscriptionResponse>;
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
  name: Scalars['String'];
  image: Scalars['String'];
};


export type MutationCreateSensorArgs = {
  input?: Maybe<SensorInput>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
};


export type MutationSubscribeToMachineArgs = {
  userID: Scalars['ID'];
  machineID: Scalars['ID'];
};


export type MutationUnsubscribeFromMachineArgs = {
  userID: Scalars['ID'];
  machineID: Scalars['ID'];
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export enum NotificationStatus {
  Working = 'Working',
  Unacknowledged = 'Unacknowledged',
  Acknowledged = 'Acknowledged'
}

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

export type Sample = {
  __typename?: 'Sample';
  timestamp: Scalars['Date'];
  value: Scalars['Float'];
};

export type SampleChunk = {
  __typename?: 'SampleChunk';
  id: Scalars['ID'];
  samples: Array<Sample>;
};

export type Sensor = {
  __typename?: 'Sensor';
  id: Scalars['ID'];
  machineId: Scalars['ID'];
  name: Scalars['String'];
  healthStatus?: Maybe<Status>;
  notificationStatus?: Maybe<NotificationStatus>;
  threshold?: Maybe<Scalars['Float']>;
  unit: Scalars['String'];
  sampleChunks: Array<SampleChunk>;
};

export type SensorCreationResponse = MutationResponse & {
  __typename?: 'SensorCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  sensor?: Maybe<Sensor>;
};

export type SensorInput = {
  machineID: Scalars['ID'];
  name: Scalars['String'];
};

export type SensorUpdatedResponse = MutationResponse & {
  __typename?: 'SensorUpdatedResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  sensor?: Maybe<Sensor>;
};

export type SensorUpdateInput = {
  name?: Maybe<Scalars['String']>;
  healthStatus?: Maybe<Status>;
  notificationStatus?: Maybe<NotificationStatus>;
  threshold?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
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
  machinesMaintaining?: Maybe<Array<Maybe<Machine>>>;
};

export type UserCreationResponse = MutationResponse & {
  __typename?: 'UserCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<User>;
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
  NotificationStatus: NotificationStatus;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  SampleChunk: ResolverTypeWrapper<SampleChunk>;
  Sample: ResolverTypeWrapper<Sample>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['MachineUpdatedResponse'] | ResolversTypes['SensorUpdatedResponse'] | ResolversTypes['MachineCreationResponse'] | ResolversTypes['SensorCreationResponse'] | ResolversTypes['UserCreationResponse'] | ResolversTypes['MachineSubscriptionResponse'] | ResolversTypes['UserUpdatedResponse'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MachineUpdateInput: MachineUpdateInput;
  MachineUpdatedResponse: ResolverTypeWrapper<MachineUpdatedResponse>;
  SensorUpdateInput: SensorUpdateInput;
  SensorUpdatedResponse: ResolverTypeWrapper<SensorUpdatedResponse>;
  MachineCreationResponse: ResolverTypeWrapper<MachineCreationResponse>;
  SensorInput: SensorInput;
  SensorCreationResponse: ResolverTypeWrapper<SensorCreationResponse>;
  UserCreationResponse: ResolverTypeWrapper<UserCreationResponse>;
  MachineSubscriptionResponse: ResolverTypeWrapper<MachineSubscriptionResponse>;
  Unit: Unit;
  UserUpdatedResponse: ResolverTypeWrapper<UserUpdatedResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  ID: Scalars['ID'];
  User: User;
  String: Scalars['String'];
  Machine: Machine;
  Sensor: Sensor;
  Float: Scalars['Float'];
  SampleChunk: SampleChunk;
  Sample: Sample;
  Date: Scalars['Date'];
  Mutation: {};
  MutationResponse: ResolversParentTypes['MachineUpdatedResponse'] | ResolversParentTypes['SensorUpdatedResponse'] | ResolversParentTypes['MachineCreationResponse'] | ResolversParentTypes['SensorCreationResponse'] | ResolversParentTypes['UserCreationResponse'] | ResolversParentTypes['MachineSubscriptionResponse'] | ResolversParentTypes['UserUpdatedResponse'];
  Boolean: Scalars['Boolean'];
  MachineUpdateInput: MachineUpdateInput;
  MachineUpdatedResponse: MachineUpdatedResponse;
  SensorUpdateInput: SensorUpdateInput;
  SensorUpdatedResponse: SensorUpdatedResponse;
  MachineCreationResponse: MachineCreationResponse;
  SensorInput: SensorInput;
  SensorCreationResponse: SensorCreationResponse;
  UserCreationResponse: UserCreationResponse;
  MachineSubscriptionResponse: MachineSubscriptionResponse;
  UserUpdatedResponse: UserUpdatedResponse;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MachineResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sensors?: Resolver<Array<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MachineCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineCreationResponse'] = ResolversParentTypes['MachineCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MachineSubscriptionResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineSubscriptionResponse'] = ResolversParentTypes['MachineSubscriptionResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MachineUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MachineUpdatedResponse'] = ResolversParentTypes['MachineUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machine?: Resolver<Maybe<ResolversTypes['Machine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  updateMachine?: Resolver<Maybe<ResolversTypes['MachineUpdatedResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMachineArgs, 'id'>>;
  updateSensor?: Resolver<Maybe<ResolversTypes['SensorUpdatedResponse']>, ParentType, ContextType, RequireFields<MutationUpdateSensorArgs, 'id' | 'machineID'>>;
  createMachine?: Resolver<Maybe<ResolversTypes['MachineCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateMachineArgs, 'name' | 'image'>>;
  createSensor?: Resolver<Maybe<ResolversTypes['SensorCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateSensorArgs, never>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserCreationResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email'>>;
  subscribeToMachine?: Resolver<Maybe<ResolversTypes['MachineSubscriptionResponse']>, ParentType, ContextType, RequireFields<MutationSubscribeToMachineArgs, 'userID' | 'machineID'>>;
  unsubscribeFromMachine?: Resolver<Maybe<ResolversTypes['MachineSubscriptionResponse']>, ParentType, ContextType, RequireFields<MutationUnsubscribeFromMachineArgs, 'userID' | 'machineID'>>;
}>;

export type MutationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'MachineUpdatedResponse' | 'SensorUpdatedResponse' | 'MachineCreationResponse' | 'SensorCreationResponse' | 'UserCreationResponse' | 'MachineSubscriptionResponse' | 'UserUpdatedResponse', ParentType, ContextType>;
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

export type SampleResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Sample'] = ResolversParentTypes['Sample']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SampleChunkResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SampleChunk'] = ResolversParentTypes['SampleChunk']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  samples?: Resolver<Array<ResolversTypes['Sample']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SensorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Sensor'] = ResolversParentTypes['Sensor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  machineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  healthStatus?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  notificationStatus?: Resolver<Maybe<ResolversTypes['NotificationStatus']>, ParentType, ContextType>;
  threshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sampleChunks?: Resolver<Array<ResolversTypes['SampleChunk']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SensorCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SensorCreationResponse'] = ResolversParentTypes['SensorCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SensorUpdatedResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SensorUpdatedResponse'] = ResolversParentTypes['SensorUpdatedResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sensor?: Resolver<Maybe<ResolversTypes['Sensor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machinesMaintaining?: Resolver<Maybe<Array<Maybe<ResolversTypes['Machine']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserCreationResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserCreationResponse'] = ResolversParentTypes['UserCreationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
  MachineCreationResponse?: MachineCreationResponseResolvers<ContextType>;
  MachineSubscriptionResponse?: MachineSubscriptionResponseResolvers<ContextType>;
  MachineUpdatedResponse?: MachineUpdatedResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers;
  Query?: QueryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  SampleChunk?: SampleChunkResolvers<ContextType>;
  Sensor?: SensorResolvers<ContextType>;
  SensorCreationResponse?: SensorCreationResponseResolvers<ContextType>;
  SensorUpdatedResponse?: SensorUpdatedResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCreationResponse?: UserCreationResponseResolvers<ContextType>;
  UserUpdatedResponse?: UserUpdatedResponseResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>;
