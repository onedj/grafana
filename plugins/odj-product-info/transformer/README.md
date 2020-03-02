curl -u $creds  http://core.odjint.schwarz/api/orgs/ce/products/ratings

# how to get all infras

infras = live,work

curl -u $creds  http://core.odjint.schwarz/api/orgs/ce/products/ratings/infras/live

Infra Status:

curl -u $creds  http://core.odjint.schwarz/api/orgs/ce/products/ratings/infras/live/status

# how to get all stages

stages = dev,prod,qa,test

curl -u $creds  http://core.odjint.schwarz/api/orgs/ce/products/ratings/stages/prod

Letzter aktueller Lauf auf einem Stage:

curl -u $creds -L http://core.odjint.schwarz/api/orgs/ce/products/ratings/stages/prod/history/latest


# component deployments

curl -u $creds  http://core.odjint.schwarz/api/orgs/ce/products/ratings/stages/prod/component-deployments/api


### Further details

Execution environments:

curl -v -u $creds  http://core.odjint.schwarz/api/execenv-catalog/ce
