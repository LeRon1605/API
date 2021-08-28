#include<stdio.h>
int isLast(int arr[], int n, int k){
	for (int i = k;i >= 0;i--){
		if (arr[i] != n - k + i) return i;
	}
	return 0;
}
int main(){
	int n;
	scanf("%d", &n);
	for (int q = 1;q <= n;q++){
		int n, k;
		scanf("%d%d", &n, &k);
		int arr[k + 1];
		for (int i = 1;i <= k;i++){
			scanf("%d", &arr[i]);
		}
		int i = isLast(arr, n, k);
		if (i == 0){
			for (int i = 1;i <= k;i++) arr[i] = i;
		}else{
			arr[i] += 1;
			for (int j = i + 1;j <= k;j++) arr[j] = arr[i] + j - i; 
		}
		for (int i = 1;i <= k;i++) printf("%d ", arr[i]);
		printf("\n");
	}
}