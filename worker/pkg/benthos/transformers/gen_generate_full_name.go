
// Code generated by Neosync neosync_transformer_generator.go. DO NOT EDIT.
// source: generate_full_name.go

package transformers

import (
	"fmt"
	
	transformer_utils "github.com/nucleuscloud/neosync/worker/pkg/benthos/transformers/utils"
	"github.com/nucleuscloud/neosync/worker/pkg/rng"
	
)

type GenerateFullName struct{}

type GenerateFullNameOpts struct {
	randomizer     rng.Rand
	
	maxLength int64
}

func NewGenerateFullName() *GenerateFullName {
	return &GenerateFullName{}
}

func (t *GenerateFullName) GetJsTemplateData() (*TemplateData, error) {
	return &TemplateData{
		Name: "generateFullName",
		Description: "Generates a new full name consisting of a first and last name.",
		Example: "",
	}, nil
}

func (t *GenerateFullName) ParseOptions(opts map[string]any) (any, error) {
	transformerOpts := &GenerateFullNameOpts{}

	maxLength, ok := opts["maxLength"].(int64)
	if !ok {
		maxLength = 10000
	}
	transformerOpts.maxLength = maxLength

	var seed int64
	seedArg, ok := opts["seed"].(int64)
	if ok {
		seed = seedArg
	} else {
		var err error
		seed, err = transformer_utils.GenerateCryptoSeed()
		if err != nil {
			return nil, fmt.Errorf("unable to generate seed: %w", err)
		}
	}
	transformerOpts.randomizer = rng.New(seed)

	return transformerOpts, nil
}
