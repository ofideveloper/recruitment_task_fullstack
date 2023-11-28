export const getCurrenciesConf = () => {
	return [
		{
			
			code: 'EUR',
			isActive: true,
			sellSpread: 0.07,
			buySpread: -0.05
		},
		{
			code: 'USD',
			isActive: true,
			sellSpread: 0.07,
			buySpread: -0.05
		},
		{
			code: 'CZK',
			isActive: true,
			buySpread: false,
			sellSpread: 0.15,
		},
		{
			code: 'IDR',
			isActive: true,
			buySpread: false,
			sellSpread: 0.15,
		},
		{
			code: 'BRL',
			isActive: true,
			buySpread: false,
			sellSpread: 0.15,
		}
	]
}