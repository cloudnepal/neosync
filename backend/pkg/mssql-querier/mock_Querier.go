// Code generated by mockery. DO NOT EDIT.

package mssql_queries

import (
	context "context"

	mysql_queries "github.com/nucleuscloud/neosync/backend/gen/go/db/dbschemas/mysql"
	mock "github.com/stretchr/testify/mock"
)

// MockQuerier is an autogenerated mock type for the Querier type
type MockQuerier struct {
	mock.Mock
}

type MockQuerier_Expecter struct {
	mock *mock.Mock
}

func (_m *MockQuerier) EXPECT() *MockQuerier_Expecter {
	return &MockQuerier_Expecter{mock: &_m.Mock}
}

// GetRolePermissions provides a mock function with given fields: ctx, db
func (_m *MockQuerier) GetRolePermissions(ctx context.Context, db mysql_queries.DBTX) ([]*GetRolePermissionsRow, error) {
	ret := _m.Called(ctx, db)

	if len(ret) == 0 {
		panic("no return value specified for GetRolePermissions")
	}

	var r0 []*GetRolePermissionsRow
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, mysql_queries.DBTX) ([]*GetRolePermissionsRow, error)); ok {
		return rf(ctx, db)
	}
	if rf, ok := ret.Get(0).(func(context.Context, mysql_queries.DBTX) []*GetRolePermissionsRow); ok {
		r0 = rf(ctx, db)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]*GetRolePermissionsRow)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, mysql_queries.DBTX) error); ok {
		r1 = rf(ctx, db)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MockQuerier_GetRolePermissions_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetRolePermissions'
type MockQuerier_GetRolePermissions_Call struct {
	*mock.Call
}

// GetRolePermissions is a helper method to define mock.On call
//   - ctx context.Context
//   - db mysql_queries.DBTX
func (_e *MockQuerier_Expecter) GetRolePermissions(ctx interface{}, db interface{}) *MockQuerier_GetRolePermissions_Call {
	return &MockQuerier_GetRolePermissions_Call{Call: _e.mock.On("GetRolePermissions", ctx, db)}
}

func (_c *MockQuerier_GetRolePermissions_Call) Run(run func(ctx context.Context, db mysql_queries.DBTX)) *MockQuerier_GetRolePermissions_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(mysql_queries.DBTX))
	})
	return _c
}

func (_c *MockQuerier_GetRolePermissions_Call) Return(_a0 []*GetRolePermissionsRow, _a1 error) *MockQuerier_GetRolePermissions_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *MockQuerier_GetRolePermissions_Call) RunAndReturn(run func(context.Context, mysql_queries.DBTX) ([]*GetRolePermissionsRow, error)) *MockQuerier_GetRolePermissions_Call {
	_c.Call.Return(run)
	return _c
}

// NewMockQuerier creates a new instance of MockQuerier. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewMockQuerier(t interface {
	mock.TestingT
	Cleanup(func())
}) *MockQuerier {
	mock := &MockQuerier{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}