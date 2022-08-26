export const processList = Object.freeze({
    UNLOAD_BAMBOO: 'UNLOAD_BAMBOO',
    CROSS_CUTTING: 'CROSS_CUTTING',
    SLIVER_MAKING: 'SLIVER_MAKING',
    ROUND_STICK_MAKING: 'ROUND_STICK_MAKING',
    SIZING_AND_POLISHING: 'SIZING_AND_POLISHING',
    SORTING: 'SORTING',
    PRODUCT: 'PRODUCT',
    WAREHOUSE: 'WAREHOUSE',
    TRANSPORT : 'TRANSPORT'
})

export const processDropdownList = [ 
    { label: 'Unload Bamboo', value: processList.UNLOAD_BAMBOO },
    { label: 'Cross Cutting', value: processList.CROSS_CUTTING },
    { label: 'Sliver Making', value: processList.SLIVER_MAKING },
    { label: 'Round Stick Making', value: processList.ROUND_STICK_MAKING },
    { label: 'Sizing and Polishing', value: processList.SIZING_AND_POLISHING },
    { label: 'Sorting and Packeging', value: processList.SORTING },
    { label: 'Finished Product', value: processList.PRODUCT },
    { label: 'Warehouse', value: processList.WAREHOUSE },
    { label: 'Transport', value: processList.TRANSPORT },
]

export const processLabels = {
    [processList.UNLOAD_BAMBOO]: 'Unload Bamboo',
    [processList.CROSS_CUTTING]: 'Cross Cutting',
    [processList.SLIVER_MAKING]: 'Sliver Making',
    [processList.ROUND_STICK_MAKING]: 'Round Stick Making',
    [processList.SIZING_AND_POLISHING]: 'Sizing and Polishing',
    [processList.SORTING]: 'Sorting and Packeging',
    [processList.PRODUCT]: 'Finished Product',
    [processList.WAREHOUSE]: 'Warehouse',
    [processList.TRANSPORT] : 'Transport'
}

export const cardStepsLabel = {
    'bambooWt' : 'Weight',
    'bambooUnits' : 'Units',
    'knotWt' : 'Knots',
    'splitWt' : 'Split',
    'sliverWt' :'Sliver',
    'filamentWt' : 'Filament',
   'sawDustWt' : 'Saw Dust',
   'returnedSliverWt' : 'Returned Sliver',
    'size' : 'Size',
    'quantity' : 'Quantity',
    'finishedProductWt' : 'Product'
}


export const processFlow = [
    processList.UNLOAD_BAMBOO,
    processList.CROSS_CUTTING,
    processList.SLIVER_MAKING,
    processList.ROUND_STICK_MAKING,
    processList.SIZING_AND_POLISHING,
    processList.SORTING,
    processList.PRODUCT
]

export const processStepsMap = {
    [processList.UNLOAD_BAMBOO]: [{ value: 'bambooWt', label: 'Bamboo Weight' }, { value: 'bambooUnits', label: 'Bamboo Units' }],
    [processList.CROSS_CUTTING]: [{ value: 'knotWt', label: 'Knots' }, { value: 'splitWt', label: 'Split' }],
    [processList.SLIVER_MAKING]: [{ value: 'sliverWt', label: 'Sliver' }],
    [processList.ROUND_STICK_MAKING]: [{ value: 'filamentWt', label: 'Filament' }, { value: 'sawDustWt', label: 'Saw Dust' }, { value: 'returnedSliverWt', label: 'Returned Sliver' }],
    [processList.SIZING_AND_POLISHING]: [{ value: 'polishedSticksWt', label: 'Polished Sticks' }],
    [processList.SORTING]: [{ value: 'size', label: 'Size' }, { value: 'quantity', label: 'Quantity' }],
    [processList.PRODUCT]: [{ value: 'finishedProductWt', label: 'Product' }],
}

